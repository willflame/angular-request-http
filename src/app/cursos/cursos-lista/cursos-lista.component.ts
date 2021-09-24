import { Component, OnInit } from '@angular/core';

import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CursosService } from '../cursos.service';
import { ICursoProps } from './../models/ICursoProps';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  cursos$: Observable<ICursoProps[]>;
  error$ = new Subject<boolean>();

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    // this.cursosService.list()
    //   .subscribe(dados => this.cursos = dados);

    this.cursos$ = this.cursosService.list()
      .pipe(
        catchError(error => {
          console.log(error);
          this.error$.next(true);
          return empty();
        })
      );
  }

}
