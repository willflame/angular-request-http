import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { CursosService } from '../cursos.service';
import { ICursoProps } from './../models/ICursoProps';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  // cursos: ICursoProps[];
  cursos$!: Observable<ICursoProps[]>;

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    // this.cursosService.list()
    //   .subscribe(dados => this.cursos = dados);

    this.cursos$ = this.cursosService.list();
  }

}
