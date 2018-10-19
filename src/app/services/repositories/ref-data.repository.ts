import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, filter, flatMap, first } from 'rxjs/operators';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';

import { CacheService } from 'app/services/cache.service';
import { SwapiClientService } from 'app/services/swapi-client.service';
import { Lookup, LookupValidator } from 'app/models/lookup';
import { getIdFromUrl } from 'app/helpers/id-matcher.helper';

@Injectable({
  providedIn: 'root'
})
export class RefDataRepository {
    itemPath = '';
    itemCacheBacket = 'refdata';

    constructor(private _cacheService: CacheService,
                private _swapiClient: SwapiClientService) {

    }

    get(name: string, id: string|number, bypassCache: boolean = false): Observable<Lookup> {
        return this.getAll(name, bypassCache).pipe(
            flatMap(items => items),
            filter(item => item.id == id),
            first()
        );
    }

    getAll(name: string, bypassCache: boolean = false): Observable<Lookup[]> {
        if (!bypassCache) {
            const cachedItem = this._cacheService.get<Lookup[]>(this.itemCacheBacket, name);

            if (cachedItem) {
                return of(cachedItem);
            }
        }

        return this._swapiClient.getAll<Lookup>(name)
            .pipe(
                map(items => {
                    if (items.length > 0) {
                        ThrowReporter.report(LookupValidator.decode(items[0]));
                    }
                    return items;
                }),
                map(items => {
                    items.forEach(item => {
                        item.id = getIdFromUrl(item.url);
                    });
                    return items;
                }),
                tap(items => {
                    this._cacheService.add(this.itemCacheBacket, name, items, { ttl: 15 });
                })
            );
    }
}
