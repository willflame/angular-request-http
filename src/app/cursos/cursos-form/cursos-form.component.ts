import { ICursoProps } from './../models/ICursoProps';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { CursosService } from './../cursos.service';
import { AlertModalService } from './../../shared/alert-modal/alert-modal.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

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
    private cursosService: CursosService,
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

    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap(id => this.cursosService.loadById(id))
        // switchMap(cursos => obterAulas)
      )
      .subscribe(curso => this.setValueForm(curso));

    // concatMap -> ordem da requisição importa
    // mergeMap -> ordem não importa
    // exhaustMap -> casos de login

    this.form = this.createForm();
  }

  private createForm() {
    return this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    });
  }

  private setValueForm(curso: ICursoProps) {
    this.form.patchValue({
      id: curso.id,
      name: curso.name,
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.valid) {
      this.cursosService.create(this.form.value)
        .subscribe(
          success => {
            this.modal.showAlertSuccess('Curso criado com sucesso!', 1500);
            this.location.back();
          },
          error => {
            this.modal.showAlertDanger('Erro ao criar curso, tente novamente!',1500);
          },
          () => console.log('request completo')
        );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
