import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICursoProps } from './models/ICursoProps';
import { CrudService } from './../shared/crud-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<ICursoProps> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}/cursos`);
  }
}
