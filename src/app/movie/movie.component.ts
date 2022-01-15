import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

import { MovieObject } from './movie.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie$?: Observable<MovieObject>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.movie$ = this.route.data.pipe(map((data: Data): MovieObject => data.movie));
  }
}
