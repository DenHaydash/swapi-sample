import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { environment } from 'app/../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SwapiClientService {
    constructor(private _http: HttpClient) {

    }

    get<T>(path: string): Observable<T> {
        console.log(`Getting ${path} from SWAPI`);

        return this._http.get<T>(`${environment.swapiBaseUrl}/${path}/`).pipe(share());
    }

    getAll<T>(path: string): Observable<T[]> {
        console.log(`Getting collection ${path} from SWAPI`);

        return this._http.get<{results: T[]}>(`${environment.swapiBaseUrl}/${path}/`)
            .pipe(
                map(items => items.results),
                share()
            );
    }

    create<T>(path: string, item: T): Observable<T> {
        throw new Error('Not implemented');
    }

    update<T>(path: string, item: T): Observable<T> {
        throw new Error('Not implemented');
    }

    delete<T>(path: string): Observable<T> {
        throw new Error('Not implemented');
    }
}
