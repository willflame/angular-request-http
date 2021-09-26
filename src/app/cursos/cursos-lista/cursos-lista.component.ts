import { Component, OnInit } from '@angular/core';

import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { CursosService } from '../cursos.service';
import { ICursoProps } from './../models/ICursoProps';
import { AlertModalService } from './../../shared/alert-modal/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    // private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
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
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Error ao carregar cursos. Tente novamente mais tarde.';

    this.alertService.showAlertDanger(
      'Error ao carregar cursos. Tente novamente mais tarde.', 2000);
  }

  onEdit(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  onRemove(id: number) {

  }

}
