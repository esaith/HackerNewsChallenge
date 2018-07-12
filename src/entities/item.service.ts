import { Injectable } from '@angular/core';
import { Item } from './item';
import { Observable } from 'rxjs-compat';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, flatMap, map, retry, shareReplay, publishReplay, refCount } from 'rxjs/operators';
import { forkJoin, throwError } from 'rxjs';
import { Dictionary } from '../shared/dictionary';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  itemIds: Dictionary<number[]>;
  items: Dictionary<Item>;

  constructor(private http: HttpClient) {
    this.itemIds = new Dictionary<number[]>();
    this.items = new Dictionary<Item>();
  }

  getCategoryItems(categoryId: string, max: number = 10): Observable<Item[]> {
    let apiUrl = `https://hacker-news.firebaseio.com/v0/${categoryId}.json?print=pretty`;

   
    return this.http.get<Array<number>>(apiUrl)
      .pipe(flatMap(ids => {
        return this.getItemsFromCategory(ids, max);
      }),
      retry<Item[]>(1),
      catchError(this.handleError)
      );
  }

  getItemsFromCategory(ids: Array<number> | number, max: number): Observable<Item[]> {
    if (typeof ids === 'number')
      return forkJoin(this.getById(ids));

    ids = ids.slice(0, max);

    return forkJoin(ids.map(id => this.getById(id).pipe(map(x => x))));
  }

  getById(id: number | string): Observable<Item> {
    return this.http.get<Item>(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
      .pipe(
      retry<Item>(1),
      catchError<Item, Item>(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
