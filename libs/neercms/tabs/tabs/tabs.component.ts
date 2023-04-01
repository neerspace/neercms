import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TabTemplateDirective } from '../tab-template.directive';
import { TabComponent } from '../tab/tab.component';
import { TabKey } from '../types';

@Component({
  selector: 'nc-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabTemplateDirective) templates: QueryList<TabTemplateDirective> =
    new QueryList<TabTemplateDirective>();
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList<TabComponent>();
  @ViewChild('container', { read: ViewContainerRef }) dynamicTabsContainer!: ViewContainerRef;
  dynamicTabs: TabComponent[] = [];
  openedTabKeys: TabKey[] = [];

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

  get activeTab(): TabComponent | undefined {
    return this.tabs.find(tab => tab.active) ?? this.dynamicTabs.find(tab => tab.active);
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach(tab => (tab.active = false));
    this.dynamicTabs.forEach(tab => (tab.active = false));

    tab.active = true;
  }

  openDefaultTab(key: TabKey, title: string, data: any, isCloseable = true) {
    const defaultTemplate = this.templates.get(0);
    if (!defaultTemplate) {
      throw new Error('No templates found.');
    }

    this.openTab(key, title, defaultTemplate.templateName, data, isCloseable);
  }

  openTab(key: TabKey, title: string, templateName: string, data: any, isCloseable = true) {
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
    instance.template = this.templates.find(x => x.templateName === templateName)!.templateRef;
    instance.data = data;
    instance.isCloseable = isCloseable;
    instance.active = true;
    instance.tabs = this;

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
