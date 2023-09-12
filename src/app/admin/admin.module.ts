import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'categorias',
        loadChildren: () =>
          import('./categorias/categorias.module').then(
            (m) => m.CategoriasModule
          ),
      },
      {
        path: 'reactivos',
        loadChildren: () =>
          import('../formularios/formularios.module').then(
            (m) => m.FormulariosModule
          ),
      },
      {
        path: 'cursos',
        loadChildren: () =>
          import('../cursos/cursos.module').then(
            (m) => m.CursosModule
          ),
      },
    ],
  },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), HomeComponent],
    exports: [RouterModule],
})
export class AdminModule {}
