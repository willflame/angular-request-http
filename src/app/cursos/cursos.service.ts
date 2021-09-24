import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ICursoProps } from './models/ICursoProps';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list(): Observable<ICursoProps[]> {
    return this.http.get<ICursoProps[]>(this.API);
  }

  create(curso: ICursoProps) {
    return this.http.post<ICursoProps>(this.API, curso).pipe(take(1));
  }
}
