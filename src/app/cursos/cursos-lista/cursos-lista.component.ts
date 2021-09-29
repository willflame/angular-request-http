import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ICursoProps } from './../models/ICursoProps';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  // bsModalRef: BsModalRef;

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal: TemplateRef<any>;

  cursos$: Observable<ICursoProps[]>;
  error$ = new Subject<boolean>();

  cursoSelectId: number;

  constructor(
    // private cursosService: CursosService,
    private cursosService: Cursos2Service,
    // private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.cursosService.list()
    //   .subscribe(dados => this.cursos = dados);

    this.onRefresh();
  }

  onRefresh(): void {
    this.cursos$ = this.cursosService.list()
      .pipe(
        catchError(error => {
          console.log(error);
          // this.error$.next(true);
          this.handleError();
          return EMPTY;
        })
      );
  }

  handleError(): void {
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Error ao carregar cursos. Tente novamente mais tarde.';

    this.alertService.showAlertDanger(
      'Error ao carregar cursos. Tente novamente mais tarde.', 2000);
  }

  onEdit(id: number): void {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  onDelete(id: number): void {
    this.cursoSelectId = id;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });

    const result$ = this.alertService.showConfirm("Deletar curso", "Tem certeza que deseja remover este curso?");
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.cursosService.remove(id) : EMPTY )
      )
      .subscribe(
        success => {
          this.alertService.showAlertSuccess('Curso removido com sucesso', 2000);
          this.onRefresh();
        },
        error => {
          this.alertService.showAlertDanger('Error ao remover curso. Tente novamente mais tarde.', 2000);
        }
      );
  }

  // onConfirmDelete(): void {
  //   this.cursosService.remove(this.cursoSelectId)
  //     .subscribe(
  //       success => {
  //         this.alertService.showAlertSuccess('Curso removido com sucesso', 2000);
  //         this.onRefresh();
  //         this.onDeclineDelete();
  //       },
  //       error => {
  //         this.alertService.showAlertDanger('Error ao remover curso. Tente novamente mais tarde.', 2000);
  //         this.onDeclineDelete();
  //       }
  //     );
  // }

  // onDeclineDelete(): void {
  //   this.deleteModalRef.hide();
  // }
}
