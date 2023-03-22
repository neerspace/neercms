import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { NeerStorageService } from 'neercms/services/storage';
import { BehaviorSubject } from 'rxjs';
import { IThemeInfo, Themes } from './types';

@Injectable({ providedIn: 'root' })
export class ThemeService<TTheme extends string = string> {
  private readonly overlayContainer: HTMLBodyElement;
  private readonly darkBrowserTheme: MediaQueryList;
  private readonly style: HTMLLinkElement;
  private readonly document = inject(DOCUMENT);
  private readonly media = inject(MediaMatcher);
  private readonly storage = inject(NeerStorageService);
  private themes?: Themes<TTheme>;
  themeChange!: BehaviorSubject<TTheme>;

  constructor() {
    this.style = document.createElement('link');
    this.style.rel = 'stylesheet';
    document.head.appendChild(this.style);

    this.darkBrowserTheme = this.media.matchMedia('(prefers-color-scheme: dark)');
    this.overlayContainer = document.getElementsByTagName('body')[0] as HTMLBodyElement;
  }

  init(themes: Themes<TTheme>) {
    if (!themes) {
      throw new Error('Invalid themes provided!');
    }
    this.themes = themes;
    this.darkBrowserTheme.addEventListener('change', event => {
      console.log('User changed browser theme to', event.matches ? 'dark' : 'light');
      this.setTheme(this.defaultTheme);
    });
    this.themeChange = new BehaviorSubject(this.defaultTheme);

    this.refreshTheme();
  }

  private get defaultTheme(): TTheme {
    const themes = Object.entries(this.themes!);
    const isDark = this.darkBrowserTheme.matches;
    return themes.find(
      ([name, theme]) => (theme as IThemeInfo).styles?.dark === isDark,
    )![0] as TTheme;
  }

  get currentThemeName(): TTheme {
    let theme: string | null = this.storage.theme;
    if (!theme) {
      this.storage.theme = this.defaultTheme;
      return this.defaultTheme;
    }
    return theme as TTheme;
  }

  get currentTheme(): IThemeInfo {
    if (!this.themes) {
      throw new Error('Themes mast be initialized before use');
    }
    return this.themes[this.currentThemeName];
  }

  refreshTheme() {
    const storedTheme = this.storage.theme || this.defaultTheme;
    if (storedTheme) {
      this.setTheme(storedTheme as TTheme);
    }
  }

  setTheme(theme: TTheme) {
    if (!this.themes) {
      throw new Error('Themes mast be initialized before set');
    }
    const themeInfo = this.themes[theme];
    if (themeInfo) {
      this.style.href = themeInfo.stylesheet ? `/${themeInfo.stylesheet}.css` : '';
      this.storage.theme = theme;
    } else {
      console.warn('Unknown theme name:', theme);
    }
  }
}
