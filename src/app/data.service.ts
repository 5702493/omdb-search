import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Search, SearchObject } from './home/search.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'http://www.omdbapi.com/?apikey=ebcb37d8';

  constructor(private http: HttpClient) { }

  getOptions(value: string): Observable<Search[]> {
    return this.http.get<SearchObject>(this.url + '&s=' + value)
      .pipe(map((response: SearchObject): Search[] => {
        if (response.Search) {
          return response.Search;
        }
        return [];
      }));
  }
}
