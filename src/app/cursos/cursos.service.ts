import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ICursoProps } from './models/ICursoProps';
import { environment } from './../../environments/environment';
import { cursorTo } from 'readline';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list(): Observable<ICursoProps[]> {
    return this.http.get<ICursoProps[]>(this.API);
  }

  loadById(id: number): Observable<ICursoProps> {
    return this.http.get<ICursoProps>(`${this.API}/${id}`).pipe(take(1));
  }

  save(curso: ICursoProps) {
    if (curso.id) {
      return this.update(curso);
    }
    return this.create(curso);
  }

  private create(curso: ICursoProps): Observable<ICursoProps> {
    return this.http.post<ICursoProps>(this.API, curso).pipe(take(1));
  }

  private update(curso: ICursoProps): Observable<ICursoProps> {
    return this.http.put<ICursoProps>(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }
}
