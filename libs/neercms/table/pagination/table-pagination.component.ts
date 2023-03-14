import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss'],
})
export class TablePaginationComponent implements OnChanges {
  @Input() page: number = 0;
  @Input() pageSize: number = 0;
  @Input() total: number = 0;

  @Output() pageChange = new EventEmitter<number>();

  items: number[] = [];
  lastPage: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.lastPage = Math.ceil(this.total / this.pageSize);
    this.refresh();
  }

  setPage(value: number): void {
    this.page = value;
    this.pageChange.emit(value);
    this.refresh();
  }

  refresh(): void {
    const nextShowCount = 2;
    const displayCount = nextShowCount * 2 + 1;
    const lastPage = this.lastPage;

    const generateItems = (from: number, count: number) => {
      const res = [];
      for (let i = from; i < from + count; i++) {
        res.push(i);
      }
      return res;
    };

    // 1 2 3
    if (lastPage < displayCount + 4) {
      // console.log('case 1: 1 2 3');
      this.items = generateItems(1, lastPage);
    }
    // 1 2 3 4 5 ... 20
    else if (this.page < nextShowCount + 4) {
      // console.log('case 2: 1 2 3 4 5 ... 20');
      this.items = generateItems(1, displayCount + 2);
    }
    // 1 ... 16 17 18 19 20
    else if (this.page > lastPage - displayCount) {
      // console.log('case 3: 1 ... 16 17 18 19 20');
      this.items = generateItems(lastPage - displayCount - 1, displayCount + 2);
    }
    // 1 2 3 4 5 6 7
    else if (this.page - nextShowCount - 2 === 1 && this.page + nextShowCount + 2 === lastPage) {
      // console.log('case 4: 1 2 3 4 5 6 7');
      this.items = generateItems(this.page - nextShowCount - 2, displayCount + 4);
    }
    // 1 ... 7 8 9 10 11 ... 20
    else {
      // console.log('case 5: 1 ... 7 8 9 10 11 ... 20');
      this.items = generateItems(this.page - nextShowCount, displayCount);
    }
  }
}
