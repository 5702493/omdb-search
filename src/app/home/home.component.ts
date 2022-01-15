import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { Search, SearchObject } from './search.model';

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
  dataSource?: MatTableDataSource<Search>;
  displayedColumns: string[] = ['Title', 'Year', 'Type'];
  totalResults = 0;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

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
    this.getDataSource(this.currentSearch, 1, true);
  }

  navigateTo(event: MatOptionSelectionChange, imdbID: string): void {
    this.router.navigate(['movie', imdbID]);
  }

  onPagination(event: PageEvent, form: FormGroup): void {
    if (form.value.myControl !== this.currentSearch) {
      form.setValue({
        myControl: this.currentSearch
      }, {
        emitEvent: false
      });
    }
    this.getDataSource(this.currentSearch, event.pageIndex + 1);
  }

  getDataSource(value: string, page: number, init?: boolean): void {
    this.service.getData(value, page).subscribe((data: SearchObject): void => {
      this.dataSource = new MatTableDataSource(data.Search);
      this.totalResults = Number(data.totalResults);
      if (init && this.paginator) {
        this.paginator.pageIndex = 0;
      }
    });
  }
}
