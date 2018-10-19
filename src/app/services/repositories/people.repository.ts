import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';

import { CacheService } from 'app/services/cache.service';
import { SwapiClientService } from 'app/services/swapi-client.service';
import { Person, PersonValidator } from 'app/models/person';
import { getIdFromUrl } from 'app/helpers/id-matcher.helper';

@Injectable({
  providedIn: 'root'
})
export class PeopleRepository {
    itemPath = 'people';
    itemCacheBacket = 'people';

    constructor(private _cacheService: CacheService,
                private _swapiClient: SwapiClientService) {

    }

    get(id: number, bypassCache: boolean = false): Observable<Person> {
        if (!bypassCache) {
            const cachedItem = this._cacheService.get(this.itemCacheBacket, id);

            if (cachedItem) {
                return of(cachedItem);
            }
        }

        return this._swapiClient.get<Person>(`${this.itemPath}/${id}`)
            .pipe(
                map(item => {
                    ThrowReporter.report(PersonValidator.decode(item));
                    return item;
                }),
                map(item => {
                    item.id = getIdFromUrl(item.url);
                    return item;
                }),
                tap(item => {
                    this._cacheService.add(this.itemCacheBacket, id, item);
                })
            );
    }

    getAll(bypassCache: boolean = false): Observable<Person[]> {
        if (!bypassCache) {
            const cachedItems = this._cacheService.getAll(this.itemCacheBacket);

            if (cachedItems) {
                return of(cachedItems);
            }
        }

        return this._swapiClient.getAll<Person>(this.itemPath)
            .pipe(
                map(items => {
                    if (items.length > 0) {
                        ThrowReporter.report(PersonValidator.decode(items[0]));
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
                    items.forEach(item => {
                        this._cacheService.add(this.itemCacheBacket, item.id, item);
                    });
                })
            );
    }

    create(person: Person): Observable<Person> {
        return this._swapiClient.create<Person>(this.itemPath, person)
            .pipe(
                map(item => {
                    ThrowReporter.report(PersonValidator.decode(item));
                    return item;
                }),
                map(item => {
                    item.id = getIdFromUrl(item.url);
                    return item;
                }),
                tap(item => {
                    this._cacheService.add(this.itemCacheBacket, item.id, item);
                })
            );
    }

    update(person: Person): Observable<Person> {
        return this._swapiClient.update<Person>(`${this.itemPath}/${person.id}`, person)
            .pipe(
                map(item => {
                    ThrowReporter.report(PersonValidator.decode(item));
                    return item;
                }),
                map(item => {
                    item.id = getIdFromUrl(item.url);
                    return item;
                }),
                tap(item => {
                    this._cacheService.add(this.itemCacheBacket, item.id, item);
                })
            );
    }

    delete(person: Person): Observable<Person> {
        return this._swapiClient.delete<Person>(`${this.itemPath}/${person.id}`)
            .pipe(
                map(item => {
                    ThrowReporter.report(PersonValidator.decode(item));
                    return item;
                }),
                map(item => {
                    item.id = getIdFromUrl(item.url);
                    return item;
                }),
                tap(item => {
                    this._cacheService.remove(this.itemCacheBacket, item.id);
                })
            );
    }
}
