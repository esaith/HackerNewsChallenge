import { Injectable } from '@angular/core';
import { Item } from './item';
import { Observable } from 'rxjs-compat';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, flatMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Dictionary } from '../shared/dictionary';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  items: Dictionary<Item>;
  
  constructor(private http: HttpClient) { 
    this.items = new Dictionary<Item>();
  }

  getCategoryItems(categoryId: string): Observable<Item[]> {
    let apiUrl = `https://hacker-news.firebaseio.com/v0/${categoryId}.json?print=pretty`;
    
    if (this.items.contains(categoryId))

    return this.http.get<Array<number>>(apiUrl).pipe(flatMap(ids => {
      if (typeof ids === 'number')
        return forkJoin(this.getById(ids));

      return forkJoin(ids.map(id => this.getById(id).pipe(map(x => x))))		
    }));
  }

  getById(id: number|string): Observable<Item> {
    return this.http.get<Item>(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);     
  }
}