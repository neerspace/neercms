import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NeerStorageService } from 'neercms/services/storage';
import { ColumnInfo, ColumnsChanges } from 'neercms/table/types';

@Component({
  selector: 'nc-column-chooser',
  templateUrl: './column-chooser.component.html',
  styleUrls: ['./column-chooser.component.scss'],
})
export class ColumnChooserComponent implements OnInit, OnChanges {
  @Input() columns!: ColumnInfo[];
  @Input() sequenceName!: string;
  @Input() sequence: string[] = [];

  @Output() columnsChange: EventEmitter<ColumnInfo[]> = new EventEmitter();
  @Output() sequenceChange: EventEmitter<string[]> = new EventEmitter();

  optionColumns!: ColumnInfo[];

  constructor(private storage: NeerStorageService) {}

  ngOnInit() {
    console.log('cols on init:', this.columns);
  }

  ngOnChanges(changes: ColumnsChanges): void {
    if (changes.columns) {
      console.log('cols on change:', this.columns);
      this.updateChooserOptions();
    }
  }

  onOptionChange(column: ColumnInfo, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    column.hidden = !checkbox.checked;

    if (column.hidden) {
      // Disallow hide last column
      if (this.sequence.length <= 1) {
        checkbox.checked = true;
        column.hidden = false;
      } else {
        this.sequence = this.sequence.filter(x => x !== column.key);
        this.sequenceChange.emit(this.sequence);
      }
    } else {
      this.sequence.push(column.key!);
      this.sequenceChange.emit(this.sequence);
    }

    this.columnsChange.emit(this.columns);
    this.storage.setColumnSequence(this.sequenceName, this.sequence);
  }

  private updateChooserOptions() {
    this.sequence ??= this.storage.getColumnSequence(this.sequenceName) || [];

    if (this.sequence && this.sequence.length > 0) {
      this.optionColumns = this.columns.filter(x => x.key && x.title);
    } else {
      this.sequence = this.columns.filter(x => !x.hidden).map(x => x.key!);

      setTimeout(() => this.sequenceChange.emit(this.sequence), 200);
    }

    this.optionColumns = this.columns.filter(x => x.key && x.title);
  }
}
