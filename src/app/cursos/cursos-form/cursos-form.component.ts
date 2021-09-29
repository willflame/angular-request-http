import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { AlertModalService } from './../../shared/alert-modal.service';
import { Cursos2Service } from '../cursos2.service';
import { ICursoProps } from './../models/ICursoProps';
// import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  submitted = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cursosService: Cursos2Service,
    // private cursosService: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  get f(): { [key: string]: AbstractControl; } {
    return this.form.controls;
  }

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     const curso$ = this.cursosService.loadById(id);
    //     curso$.subscribe(curso => this.setValueForm(curso));
    //   }
    // );

    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap(id => this.cursosService.loadById(id))
    //     // switchMap(cursos => obterAulas)
    //   )
    //   .subscribe(curso => this.setValueForm(curso));

    // concatMap -> ordem da requisição importa
    // mergeMap -> ordem não importa
    // exhaustMap -> casos de login

    const curso = this.route.snapshot.data['curso'];

    this.form = this.createForm(curso);
    // this.setValueForm(curso);
  }

  private createForm(curso: ICursoProps) {
    return this.fb.group({
      id: [curso.id],
      name: [curso.name, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    });
  }

  // private setValueForm(curso: ICursoProps) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     name: curso.name,
  //   });
  // }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      // if (this.form.value.id) {
      //   this.update();
      // } else {
      //   this.create();
      // }

      let messageSuccess = 'Curso criado com sucesso!';
      let messageError = 'Erro ao criar curso, tente novamente!';

      if (this.form.value.id) {
        messageSuccess = 'Curso atualizado com sucesso!';
        messageError = 'Erro ao atualizar curso, tente novamente!';
      }

      this.cursosService.save(this.form.value, this.form.value.id)
        .subscribe(
          success => {
            this.modal.showAlertSuccess(messageSuccess, 1500);
            this.location.back();
          },
          error => {
            this.modal.showAlertDanger(messageError, 1500);
          },
          () => console.log('request completo')
        );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  // private create() {
  //   this.cursosService.create(this.form.value)
  //     .subscribe(
  //       success => {
  //         this.modal.showAlertSuccess('Curso criado com sucesso!', 1500);
  //         this.location.back();
  //       },
  //       error => {
  //         this.modal.showAlertDanger('Erro ao criar curso, tente novamente!',1500);
  //       },
  //       () => console.log('request completo')
  //     );
  // }

  // private update() {
  //   this.cursosService.update(this.form.value)
  //     .subscribe(
  //       success => {
  //         this.modal.showAlertSuccess('Curso atualizado com sucesso!', 1500);
  //         this.location.back();
  //       },
  //       error => {
  //         this.modal.showAlertDanger('Erro ao atualizar curso, tente novamente!',1500);
  //       },
  //       () => console.log('request completo')
  //     );
  // }
}
