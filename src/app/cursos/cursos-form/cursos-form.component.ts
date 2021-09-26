import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { CursosService } from './../cursos.service';
import { AlertModalService } from './../../shared/alert-modal/alert-modal.service';

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
  ) { }

  get f(): { [key: string]: AbstractControl; } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm() {
    return this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
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
            this.modal.showAlertSuccess('Curso criado com sucesso!');
            this.location.back();
          },
          error => {
            this.modal.showAlertDanger('Erro ao criar curso, tente novamente!');
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
