import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { CacheService } from '../cache.service';
import { SwapiClientService } from '../swapi-client.service';
import { Person } from '../../models/person'
import { getId } from '../../helpers/id-matcher.helper';

@Injectable({
  providedIn: 'root'
})
export class PeopleRepositoryService {
    itemPath = 'people';

    constructor(private _cacheService: CacheService,
                private _swapiClient: SwapiClientService) {

    }

    get(id: number, bypassCache: boolean = false): Observable<Person> {
        if (!bypassCache) {
            const cachedItem = this._cacheService.get(this.itemPath, id);

            if (cachedItem) {
                return of(cachedItem);
            }
        }

        return this._swapiClient.get<Person>(`${this.itemPath}/${id}`)
            .pipe(
                map(item => {
                    item.id = getId(item.url);
                    return item;
                }),
                tap(item => {
                    this._cacheService.add(this.itemPath, id, item);
                })
            );
    }

    getAll(bypassCache: boolean = false): Observable<Person[]> {
        if (!bypassCache) {
            const cachedItems = this._cacheService.getAll(this.itemPath);

            if (cachedItems) {
                return of(cachedItems);
            }
        }

        return this._swapiClient.getAll<Person>(this.itemPath)
            .pipe(
                map(items => {
                    items.forEach(item => {
                        item.id = getId(item.url);
                    });
                    return items;
                }),
                tap(items => {
                    items.forEach(item => {
                        this._cacheService.add(this.itemPath, item.id, item);
                    });
                })
            );
    }

    create(person: Person): Observable<Person> {
        return this._swapiClient.create<Person>(this.itemPath, person)
            .pipe(
                map(item => {
                    item.id = getId(item.url);
                    return item;
                }),
                tap(item => {
                    this._cacheService.add(this.itemPath, item.id, item);
                })
            );
    }

    update(person: Person): Observable<Person> {
        return this._swapiClient.update<Person>(this.itemPath, person)
            .pipe(
                map(item => {
                    item.id = getId(item.url);
                    return item;
                }),
                tap(item => {
                    this._cacheService.add(this.itemPath, item.id, item);
                })
            );
    }

    delete(person: Person): Observable<Person> {
        return this._swapiClient.delete<Person>(this.itemPath, person)
            .pipe(
                map(item => {
                    item.id = getId(item.url);
                    return item;
                }),
                tap(item => {
                    this._cacheService.remove(this.itemPath, item.id);
                })
            );
    }
}
