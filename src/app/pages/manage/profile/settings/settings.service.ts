import { Injectable } from '@angular/core';
import { FormServiceBase } from 'neercms/form';
import { ThemeService } from 'neercms/services/theme';
import { Theme, themes } from '../../../../themes';

interface ISettings {
  theme: Theme;
}

@Injectable({ providedIn: 'root' })
export class SettingsService extends FormServiceBase {
  initialState: ISettings;

  constructor(private readonly themeService: ThemeService<Theme>) {
    super({
      themeName: [themeService.currentThemeName, []],
      text: [themeService.currentThemeName, []],
      number: [0, []],
      password: ['bla-bla-bla', []],
      datetime: ['', []],
      textarea: ['', []],
    });

    this.initialState = this.form.getRawValue();
    this.themeService.init(themes);

    this.form.get('themeName')?.valueChanges.subscribe(() => {
      this.applyChanges();
    });
  }

  applyChanges() {
    const themeControl = this.form.get('themeName')!;
    console.log(themeControl.value);
    console.log(this.initialState);
    if (themeControl.value !== this.initialState.theme) {
      this.themeService.setTheme(themeControl.value);
    }
  }
}
