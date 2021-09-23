import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ICursoProps } from './models/ICursoProps';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) { }

  list(): Observable<ICursoProps[]> {
    return this.http.get<ICursoProps[]>(this.API);
  }

  create(curso: ICursoProps) {
    return this.http.post<ICursoProps>(this.API, curso).pipe(take(1));
  }
}
