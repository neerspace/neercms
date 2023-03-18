import { Component, OnInit } from '@angular/core';
import { ISelectOption } from 'neercms/form/types';
import { themes } from 'src/app/themes';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  themes: ISelectOption[] = [
    { key: 'light', title: 'Light' },
    { key: 'dark', title: 'Dark' },
  ];

  constructor(public readonly settingsService: SettingsService) {
    this.themes = Object.entries(themes).map(([name, theme]) => ({
      key: name,
      title: theme.displayName,
    }));
  }

  ngOnInit(): void {
    this.settingsService.init(true);
  }
}
