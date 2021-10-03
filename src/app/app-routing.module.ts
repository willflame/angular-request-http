import { ReactiveSearchModule } from './reactive-search/reactive-search.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'upload'
  },
  {
    path: 'cursos',
    // loadChildren: './cursos/cursos.module#CursosModule'
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload-file/upload-file.module').then(m => m.UploadFileModule)
  },
  {
    path: 'busca-reativa',
    loadChildren: () => import('./reactive-search/reactive-search.module').then(m => m.ReactiveSearchModule)
  },
  { path: '**', redirectTo: 'cursos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
