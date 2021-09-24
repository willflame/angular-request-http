import { Component, OnInit } from '@angular/core';

import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CursosService } from '../cursos.service';
import { ICursoProps } from './../models/ICursoProps';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  bsModalRef: BsModalRef;

  cursos$: Observable<ICursoProps[]>;
  error$ = new Subject<boolean>();

  constructor(
    private cursosService: CursosService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    // this.cursosService.list()
    //   .subscribe(dados => this.cursos = dados);

    this.cursos$ = this.cursosService.list()
      .pipe(
        catchError(error => {
          console.log(error);
          // this.error$.next(true);
          this.handleError();
          return empty();
        })
      );
  }

  handleError() {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Error ao carregar cursos. Tente novamente mais tarde.';
  }

}
