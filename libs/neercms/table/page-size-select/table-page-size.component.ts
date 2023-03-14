import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-size',
  templateUrl: './table-page-size.component.html',
  styleUrls: ['./table-page-size.component.scss'],
})
export class TablePageSizeComponent {
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100, 500];
  @Input() pageSize: number = this.pageSizeOptions[0];

  @Output() pageSizeChange = new EventEmitter<number>();

  setPageSize(value: number): void {
    this.pageSize = value;
    this.pageSizeChange.emit(value);
  }
}
