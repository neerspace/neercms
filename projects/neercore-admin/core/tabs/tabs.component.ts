import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList<TabComponent>();
  @ViewChild('container', { read: ViewContainerRef }) dynamicTabsContainer!: ViewContainerRef;
  dynamicTabs: TabComponent[] = [];
  openedTabKeys: string[] = [];

  ngAfterContentInit(): void {
    let activeTabs = this.tabs.filter(tab => tab.active);

    if (activeTabs.length === 0 && this.tabs.first) {
      this.selectTab(this.tabs.first);
    }

    for (const tab of this.tabs) {
      if (tab.key && !this.openedTabKeys.includes(tab.key)) {
        this.openedTabKeys.push(tab.key);
      }
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach(tab => (tab.active = false));
    this.dynamicTabs.forEach(tab => (tab.active = false));

    tab.active = true;
  }

  openTab(key: string, title: string, template: TemplateRef<any>, data: any, isCloseable = true) {
    if (this.openedTabKeys.includes(key)) {
      let tab = this.tabs.find(x => x.key === key) ?? this.dynamicTabs.find(x => x.key === key);
      if (tab) {
        this.selectTab(tab);
        return;
      }
    }

    const tabType: Type<TabComponent> = TabComponent;
    const componentRef = this.dynamicTabsContainer.createComponent<TabComponent>(tabType);
    const instance: TabComponent = componentRef.instance as TabComponent;

    instance.title = title;
    instance.key = key;
    instance.template = template;
    instance.dataContext = data;
    instance.isCloseable = isCloseable;
    instance.active = true;

    this.dynamicTabs.push(componentRef.instance as TabComponent);
    this.openedTabKeys.push(key);
    this.selectTab(componentRef.instance);
  }

  closeTab(tab: TabComponent) {
    for (let i = 0; i < this.dynamicTabs.length; i++) {
      if (this.dynamicTabs[i] === tab) {
        this.dynamicTabs.splice(i, 1);

        this.dynamicTabsContainer.remove(i);
        this.openedTabKeys = this.openedTabKeys.filter(x => x !== tab.key);

        if (this.tabs.first) {
          this.selectTab(this.tabs.first);
        } else if (this.dynamicTabs.length > 0) {
          this.selectTab(this.dynamicTabs[0]);
        }

        break;
      }
    }
  }

  closeAllTabs() {
    this.dynamicTabs = [];
    this.dynamicTabsContainer.clear();
  }
}
