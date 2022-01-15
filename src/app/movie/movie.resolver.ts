import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { DataService } from '../data.service';
import { MovieObject } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieResolver implements Resolve<MovieObject> {
  constructor(
    private service: DataService,
    private router: Router
  ) { }
  resolve(route: ActivatedRouteSnapshot): Observable<MovieObject> {
    const id: string = route.paramMap.get('id')!;
    return this.service.getMovie(id)
      .pipe(take(1), mergeMap((movie: MovieObject): Observable<MovieObject> => {
        if (movie.Response === 'True') {
          return of(movie);
        }
        this.router.navigate(['/']);
        return EMPTY;
      }));
  }
}
