import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private _cacheStore = new Map<string, Map<string, CacheItem>>();

  constructor() {}

  public add(backet: string, key: string|number, obj: any, options: CacheOptions = { ttl: 90 }): void {
    console.log('Saving to cache...');

    this._getBacket(backet).set(`${key}`, {
      value: obj,
      expiresAt: this._getExpirationTime(options.ttl)
    });
  }

  public get(backet: string, key: string|number): any {
    console.log('Getting from cache...');
    const cacheItem = this._getBacket(backet).get(`${key}`);

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
    return cacheItem.value;
  }

  public getAll(backet: string): any[] {
    let result: any[] = null;

    const now = new Date();

    this._getBacket(backet).forEach(item => {
      if (item.expiresAt >= now) {
        result = result || [];
        result.push(item);
      } else {
        return null;
      }
    });

    return result;
  }

  public remove(backet: string, key: string|number): void {
    console.log('Removing from cache...');
    this._getBacket(backet).delete(`${key}`);
  }

  public clear(): void {
    console.log('Cache destroyed...');
    this._cacheStore.clear();
  }

  private _getBacket(backetName: string): Map<string, CacheItem> {
    let backet = this._cacheStore[backetName];

    if (!backet) {
      backet = new Map<string, CacheItem>();
      this._cacheStore[backetName] = backet;
    }

    return backet;
  }


  private _getExpirationTime(ttl: number): Date {
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + ttl);
    return expiresAt;
  }
}

interface CacheItem {
  value: any;
  expiresAt: Date;
}

export interface CacheOptions {
  ttl: number;
}
