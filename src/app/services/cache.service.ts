import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private _cacheStore = new Map<string, Map<string, CacheItem>>();

  constructor() {}

  public add<T>(backet: string, key: string|number, obj: T, options: CacheOptions = { ttl: 90 }): void {
    console.log('Saving to cache...');

    this._getBacket(backet).set(`${key}`, {
      value: obj,
      expiresAt: this._getExpirationTime(options.ttl)
    });
  }

  public get<T>(backet: string, key: string|number): T {
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
    return cacheItem.value as T;
  }

  public getAll<T>(backet: string): T[] {
    let result: T[] = null;

    const now = new Date();

    this._getBacket(backet).forEach(item => {
      if (item.expiresAt >= now) {
        result = result || [];
        result.push(item.value);
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
