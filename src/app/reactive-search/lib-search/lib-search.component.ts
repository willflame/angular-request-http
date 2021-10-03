import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap, switchMap } from 'rxjs/operators';

import { SearchService } from '../search.service';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss'],
})
export class LibSearchComponent implements OnInit {
  queryField = new FormControl();
  total: number;

  readonly FIELDS = 'name,description,version,homepage';
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';

  results$: Observable<any>;

  constructor(private service: SearchService) {}

  ngOnInit() {
    this.results$ = this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 1),
        debounceTime(400),
        distinctUntilChanged(),
        tap(value => console.log(value)),
        switchMap(value => {
          let params = new HttpParams();
          params = params.set('search', value);
          params = params.set('fields', this.FIELDS);

          return this.service.searchByTerm(this.SEARCH_URL, params)
      }),
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results)
      );
  }

  onSearch() {
    const fields = 'name,description,version,homepage';
    let value = this.queryField.value;

    if (value && (value = value.trim()) !== '') {

      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', fields);

      this.results$ = this.service
        .searchByTerm(
          this.SEARCH_URL,
          params
        )
        .pipe(
          tap((res: any) => (this.total = res.total)),
          map((res: any) => res.results)
        );
    }
  }
}
