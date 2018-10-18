import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'

import { CacheService } from '../cache.service';
import { SwapiClientService } from '../swapi-client.service';
import { Planet } from '../../models/planet'
import { getId } from '../../helpers/id-matcher.helper';
import { PlanetValidator } from '../../models/planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetsRepositoryService {
    itemPath = 'planets';

    constructor(private _cacheService: CacheService,
                private _swapiClient: SwapiClientService) {

    }

    get(id: number, bypassCache: boolean = false): Observable<Planet> {
        if (!bypassCache) {
            const cachedItem = this._cacheService.get(this.itemPath, id);

            if (cachedItem) {
                return of(cachedItem);
            }
        }
        
        return this._swapiClient.get<Planet>(`${this.itemPath}/${id}`)
            .pipe(
                map(item => {
                    ThrowReporter.report(PlanetValidator.decode(item));
                    return item;
                }),
                map(item => {
                    item.id = getId(item.url);
                    return item;
                }),
                tap(item => {
                    this._cacheService.add(this.itemPath, id, item);
                })
            );
    }

    getAll(bypassCache: boolean = false): Observable<Planet[]> {
        if (!bypassCache) {
            const cachedItems = this._cacheService.getAll(this.itemPath);

            if (cachedItems) {
                return of(cachedItems);
            }
        }

        return this._swapiClient.getAll<Planet>(this.itemPath)
            .pipe(
                map(items => {
                    if (items.length > 0) {
                        ThrowReporter.report(PlanetValidator.decode(items[0]));
                    }
                    return items;
                }),
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

    create(planet: Planet): Observable<Planet> {
        return this._swapiClient.create<Planet>(this.itemPath, planet)
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

    update(planet: Planet): Observable<Planet> {
        return this._swapiClient.update<Planet>(this.itemPath, planet)
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

    delete(planet: Planet): Observable<Planet> {
        return this._swapiClient.delete<Planet>(this.itemPath, planet)
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
