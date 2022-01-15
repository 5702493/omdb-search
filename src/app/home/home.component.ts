import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { Search } from './search.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    myControl: new FormControl()
  });
  filteredOptions?: Observable<Search[]>;
  currentSearch = '';

  constructor(
    private service: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.filteredOptions = this.myForm.get('myControl')?.valueChanges
      .pipe(startWith(''),
        switchMap((value: string): Observable<Search[]> => this.filterOptions(value)));
  }

  filterOptions(value: string): Observable<Search[]> {
    if (!value || value.length < 5) {
      return of([]);
    }
    return this.service.getOptions(value)
      .pipe(map((search: Search[]): Search[] => {
        const filterValue: string = value.toLowerCase();
        return search.filter((movie: Search): boolean => movie.Title.toLowerCase().includes(filterValue));
      }));
  }

  onSubmit(form: FormGroup): void {
    this.currentSearch = form.value.myControl;
  }

  navigateTo(event: MatOptionSelectionChange, imdbID: string): void {
    this.router.navigate(['movie', imdbID]);
  }
}
