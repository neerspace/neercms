import { Component, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { logger } from 'app/environments/environment';
import { ErrorDto } from '../../../api';
import { StorageService } from '../../../services/storage';
import { ToasterService } from '../../../services/viewport';
import { CustomColumnDirective } from '../custom-column.directive';
import { TablePaginationComponent } from '../pagination/table-pagination.component';
import { buildFiltersQuery, postfixes } from '../sieve';
import { ColumnInfo, DataTableError, FetchApiEvent, FilterType, IFilterParams } from '../types';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent<T> implements OnInit {
  @ViewChild('pagination') pagination!: TablePaginationComponent;

  @ContentChildren(CustomColumnDirective, { descendants: true })
  customColumnTemplates!: QueryList<CustomColumnDirective<T>>;

  @Input() defaultSorting: string | null = 'id';
  @Input() columns: ColumnInfo[] = [];
  @Input() columnChooser: boolean = false;
  @Input() columnChooserSequence?: string;
  @Input() onFilter!: FetchApiEvent<T>;

  sortsAsc = true;
  sorts!: string | null;
  page = 1;
  pageSize = 10;
  total = 0;
  data?: any[];
  loading: boolean = true;
  pageIndicatorText: string = '';
  columnSequence: string[] = [];

  filtersForm!: FormGroup;
  private filters?: string;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toaster: ToasterService,
    private readonly storage: StorageService,
  ) {}

  ngOnInit(): void {
    if (!this.columns || this.columns.length < 1) {
      throw new DataTableError("Param 'columns' must be specified and has at least one element!");
    }

    this.extractSorts(this.defaultSorting);
    this.filtersForm = new FormGroup({});
    if (this.columnChooser) {
      if (!this.columnChooserSequence) {
        throw new DataTableError(
          "Param 'columnChooserSequence' is required when 'columnChooser' enabled.",
        );
      }

      this.columnSequence = this.storage.getColumnSequence(this.columnChooserSequence) || [];
    }

    for (const col of this.columns as any[]) {
      col.hidden = col.hideable && !this.columnSequence.includes(col.key);

      if (col.filter) {
        if (col.filter === FilterType.optText) {
          this.filtersForm.addControl(col.key + postfixes.textOp, new FormControl());
        } else if (col.filter === FilterType.optNumber) {
          this.filtersForm.addControl(col.key + postfixes.numOp, new FormControl());
        } else if (col.filter === FilterType.dateRange) {
          //  || col.filter === FilterType.numberRange
          this.filtersForm.addControl(col.key + postfixes.endPartOp, new FormControl());
        }

        this.filtersForm.addControl(col.key, new FormControl(''));
      }
    }

    this.loadFromQueryParams();
    this.loadData();

    this.filtersForm.valueChanges
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(changes => {
        if (this.loading) {
          return;
        }
        console.log('on changes', changes);
        const newFilters = buildFiltersQuery(this.filtersForm.value);
        if (this.filters !== newFilters) {
          this.filters = newFilters;
          this.resetPagination();
          this.loadData();
        }
      });
  }

  loadData(updatePaginationInfo: boolean = false): void {
    this.setQueryParams();
    this.loading = true;

    logger.debug('[Data fetching]');
    this.onFilter({
      filters: this.filters,
      sorts: this.formattedSorts,
      page: this.page,
      pageSize: this.pageSize,
    }).subscribe({
      next: result => {
        logger.debug(
          'Table data:',
          result.data,
          // result?.data && result.data.length > 0 ? Object.keys(result.data[0]) : 'empty',
        );

        this.data = result.data!;

        if (updatePaginationInfo || result.total !== this.total) {
          this.total = result.total;
          this.pagination.setPage(this.page);
          this.updatePageIndicatorText();
        }

        setTimeout(() => (this.loading = false), 1200);
      },
      error: (error: ErrorDto) => {
        setTimeout(() => (this.loading = false), 1200);
        this.toaster.showFail(error.message);
        this.resetPagination();
      },
    });
  }

  getCustomColumnByName(templateName: string): CustomColumnDirective<T> {
    const customColumn = this.customColumnTemplates.find(x => x.templateName === templateName);
    if (!customColumn) {
      throw new DataTableError(`Custom column not found: "${templateName}"`);
    }
    return customColumn;
  }

  // setFiltersToDefault(): void {
  //   for (const filterKey of Object.keys(this.filtersForm.value)) {
  //     if (postfixes.isTextOp(filterKey)) {
  //       this.filtersForm.get(filterKey)!.setValue(defaultTextOperator);
  //     } else if (postfixes.isNumOp(filterKey)) {
  //       this.filtersForm.get(filterKey)!.setValue(defaultNumberOperator);
  //     } else {
  //       this.filtersForm.get(filterKey)!.setValue(null);
  //     }
  //   }
  // }

  changeSorts(key: string, event: MouseEvent): void {
    if (this.sorts === key) {
      // Do not reset if Alt key is press
      if (!this.sortsAsc && !event.altKey) {
        this.extractSorts(this.defaultSorting);
      }
      this.sortsAsc = !this.sortsAsc;
    } else {
      this.sorts = key;
      // Click -> ASC; Alt+Click -> DESC
      this.sortsAsc = !event.altKey;
    }

    this.loadData();
  }

  private extractSorts(sourceSorts: string | null) {
    if (sourceSorts && sourceSorts.startsWith('-')) {
      this.sorts = sourceSorts.substring(1);
      this.sortsAsc = false;
    } else {
      this.sorts = sourceSorts || 'id';
    }
  }

  changePage(newPage: number): void {
    if (this.page !== newPage) {
      this.page = newPage;
      this.updatePageIndicatorText();
      this.loadData();
    }
  }

  changePageSize(newPageSize: number): void {
    if (this.pageSize !== newPageSize) {
      this.pageSize = newPageSize;
      this.pagination.setPage(1);
      this.loadData(true);
    }
  }

  private resetPagination() {
    this.total = 0;
    this.pagination.setPage(1);
    this.updatePageIndicatorText();
  }

  private updatePageIndicatorText(): void {
    const from = this.page * this.pageSize - this.pageSize + 1;
    const to = Math.min(this.page * this.pageSize, this.total);
    if (to === 0) {
      this.pageIndicatorText = 'No Data';
    }
    const total = this.total && this.total > 0 ? ' of ' + this.total : '';
    this.pageIndicatorText = `${from} – ${to} ${total}`;
  }

  private get formattedSorts(): string {
    return this.sorts
      ? this.sortsAsc
        ? this.sorts!
        : '-' + this.sorts!
      : this.defaultSorting || 'id';
  }

  private setQueryParams(): void {
    // We set the query params with pure JS because
    // when we do the same using the Angular approach,
    // it triggers a component update every time
    const url = new URL(window.location as any);
    url.searchParams.set('page', this.page.toString());
    url.searchParams.set('limit', this.pageSize.toString());
    url.searchParams.set('sort', this.sorts ? this.formattedSorts : '');
    window.history.pushState(null, '', url.toString());
  }

  private loadFromQueryParams(): void {
    const params: IFilterParams = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: string) => searchParams.get(prop),
    }) as any;
    if (params.page && +params.page) {
      this.page = +params.page;
    }
    if (params.limit && +params.limit) {
      this.pageSize = +params.limit;
    }
    if (params.sort) {
      this.extractSorts(params.sort);
    }
    // if (params.filter) {
    //   this.filters = params.filter;
    //   const filters = parseFiltersQuery(params.filter);
    //   for (const filter of filters) {
    //     const baseKey = filter.key.replace(operatorPostfix, '').replace(endPartPostfix, '');
    //     const column = this.columns.find(x => x.key === baseKey);
    //     if (column && column.filter === FilterType.dateRange) {
    //       const date = DateTime.fromISO(filter.val);
    //       if (filter.op === Operator.LessThen) {
    //         this.filtersForm.get(filter.key + endPartPostfix)?.setValue(date);
    //       } else {
    //         this.filtersForm.get(filter.key)?.setValue(date);
    //       }
    //     }
    //
    //     this.filtersForm.get(filter.key)?.setValue(filter.val);
    //     if (filter.op !== Operator.Equals) {
    //       this.filtersForm.get(filter.key + operatorPostfix)?.setValue(filter.op);
    //     }
    //   }
    // }
  }
}
