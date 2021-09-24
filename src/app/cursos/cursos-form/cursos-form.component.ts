import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    return this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.valid) {
      console.log('submit');
      this.cursosService.create(this.form.value)
        .subscribe(
          success => {
            // this.modal.showAlertSuccess('Curso criado com sucesso!');
            this.location.back();
          },
          error => {
            // this.modal.showAlertDanger('Erro ao criar curso, tente novamente!');
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
