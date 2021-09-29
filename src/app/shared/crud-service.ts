import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export class CrudService<T> {
  constructor(protected http: HttpClient, private API_URL: string) {}

  list(): Observable<T[]> {
    return this.http.get<T[]>(this.API_URL);
  }

  loadById(id: number): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  save(record: T, id?: number): Observable<T> {
    if (id) {
      return this.update(id, record);
    }
    return this.create(record);
  }

  remove(id: number): Observable<T> {
    return this.http.delete<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private create(record: T): Observable<T> {
    return this.http.post<T>(this.API_URL, record).pipe(take(1));
  }

  private update(id: number, record: T): Observable<T> {
    return this.http.put<T>(`${this.API_URL}/${id}`, record).pipe(take(1));
  }
}
