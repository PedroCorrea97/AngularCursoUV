import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';

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
    ],
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
  exports: [RouterModule],
})
export class AdminModule {}
