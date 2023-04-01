import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';

export type TabKey = string | number;

export interface ITabContext {
  rename(newTitle: string): void;

  select(): void;

  close(): void;
}

export class TabContext implements ITabContext {
  rename(newTitle: string) {
    this.tabRef.title = newTitle;
  }

  select() {
    this.tabs.selectTab(this.tabRef);
  }

  close() {
    this.tabs.closeTab(this.tabRef);
  }

  constructor(
    public readonly key: TabKey,
    private readonly tabRef: TabComponent,
    private readonly tabs: TabsComponent,
  ) {}
}
