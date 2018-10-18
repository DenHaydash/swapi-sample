import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private _cacheStore: Map<string, CacheItem> = new Map<string, CacheItem>();

  constructor() {}

  public add(backet: string, key: string|number, obj: any, options: CacheOptions = { ttl: 90 }): void {
    console.log('Saving to cache...');
    this._cacheStore.set(`${backet}/${key}`, {
      obj,
      expiresAt: this._getExpirationTime(options.ttl)
    });
  }

  public get(backet: string, key: string|number): any {
    console.log('Getting from cache...');
    const cacheItem = this._cacheStore.get(`${backet}/${key}`);

    if (!cacheItem) {
      console.log('Cache miss...');
      return null;
    }

    if (cacheItem.expiresAt < new Date()) {
      console.log('Cache expired...');
      this.remove(backet, key);
      return null;
    }

    console.log('Cache hit...');
    return cacheItem.obj;
  }

  public getAll(backet: string): any[] {
    let result: any[] = null;

    const now = new Date();

    this._cacheStore.forEach((item, key) => {
      if (key.startsWith(backet)) {
        if (item.expiresAt >= now) {
          result = result || [];
          result.push(item);
        } else {
          return null;
        }
      }
    })

    return result;
  }

  public remove(backet: string, key: string|number): void {
    console.log('Removing from cache...');
    this._cacheStore.delete(`${backet}/${key}`);
  }

  public clear(): void {
    console.log('Cache destroyed...');
    this._cacheStore.clear();
  }

  private _getExpirationTime(ttl: number): Date {
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + ttl);
    return expiresAt;
  }
}

interface CacheItem {
  obj: any,
  expiresAt: Date
}

export class CacheOptions {
  public ttl: number
}
