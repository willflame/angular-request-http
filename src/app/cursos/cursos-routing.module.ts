import { CursoResolverGuard } from './guards/curso-resolver.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursosFormComponent } from './cursos-form/cursos-form.component';

const routes: Routes = [
  { path: '', component: CursosListaComponent },
  {
    path: 'create',
    component: CursosFormComponent,
    resolve: {
      curso: CursoResolverGuard,
    }
  },
  {
    path: 'edit/:id',
    component: CursosFormComponent,
    resolve: {
      curso: CursoResolverGuard,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
