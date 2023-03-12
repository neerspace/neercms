export abstract class StorageBase<TKey extends string = string> {
  protected getItem(key: TKey): string | null {
    return window.localStorage.getItem(key);
  }

  protected setItem(key: TKey, value: string | null) {
    if (!value) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, value);
    }
  }

  protected setJsonItem(key: TKey, jsonKey: string, value: any | null) {
    let settings = this.getItem(key);
    const json = settings ? JSON.parse(settings) : {};
    json[jsonKey] = value;
    settings = JSON.stringify(json);
    this.setItem(key, settings);
  }

  protected getJsonItem(key: TKey, jsonKey: string): any | null {
    let settings = this.getItem(key);
    return settings ? JSON.parse(settings)[jsonKey] : null;
  }
}
