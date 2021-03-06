import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Search, SearchObject } from './home/search.model';
import { MovieObject } from './movie/movie.model';

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

  getData(value: string, page: number): Observable<SearchObject> {
    return this.http.get<SearchObject>(this.url + '&s=' + value + '&page=' + page);
  }

  getMovie(id: string): Observable<MovieObject> {
    return this.http.get<MovieObject>(this.url + '&i=' + id)
      .pipe(map((movie: MovieObject): MovieObject => {
        if (movie.Poster === 'N/A') {
          movie.Poster = './assets/n_a.jpg';
        }
        return movie;
      }));
  }
}
