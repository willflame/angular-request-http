import { CursosService } from './../cursos.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable, of } from 'rxjs';

import { ICursoProps } from './../models/ICursoProps';

@Injectable({
  providedIn: 'root',
})
export class CursoResolverGuard implements Resolve<ICursoProps> {

  constructor(private cursosService: CursosService) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ICursoProps> {
    if (route.params && route.params['id']) {
      return this.cursosService.loadById(route.params['id']);
    }

    return of({
      name: '',
    });
  }
}
