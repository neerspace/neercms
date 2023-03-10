import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { StorageService } from '../storage';
import { IThemeInfo, ThemeName, themes } from '../../themes';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private defaultTheme = ThemeName.Dark;
  private overlayContainer: HTMLBodyElement;

  constructor(@Inject(DOCUMENT) document: Document, private storage: StorageService) {
    this.overlayContainer = document.getElementsByTagName('body')[0] as HTMLBodyElement;
    this.refreshTheme();
  }

  get currentThemeName(): ThemeName {
    let themeName: ThemeName | null = this.storage.theme;
    if (!themeName) {
      this.storage.theme = this.defaultTheme;
      return this.defaultTheme;
    }
    return themeName;
  }

  get currentTheme(): IThemeInfo {
    return themes[this.currentThemeName];
  }

  refreshTheme() {
    const storedTheme = this.storage.theme || ThemeName.Dark;
    if (storedTheme) {
      this.setTheme(storedTheme);
    }
  }

  toggleTheme(): void {
    const currentTheme = this.currentThemeName;
    let nextTheme: ThemeName;
    switch (currentTheme) {
      case ThemeName.Dark:
        nextTheme = ThemeName.Light;
        break;
      case ThemeName.Light:
        nextTheme = ThemeName.Dark;
        break;
    }

    this.setTheme(nextTheme);
  }

  setTheme(themeName: ThemeName) {
    let themeFound = false;
    for (const appTheme of Object.values(themes)) {
      if (appTheme.name === themeName) {
        this.overlayContainer.classList.add(appTheme.className);
        themeFound = true;
      } else if (this.overlayContainer.classList.contains(appTheme.className)) {
        this.overlayContainer.classList.remove(appTheme.className);
      }
    }

    if (!themeFound) {
      this.overlayContainer.classList.add(this.currentTheme.className);
    }

    this.storage.theme = themeName;
  }
}
