import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cursos',
    // loadChildren: './cursos/cursos.module#CursosModule'
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'cursos'
  },
  { path: '**', redirectTo: 'cursos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
