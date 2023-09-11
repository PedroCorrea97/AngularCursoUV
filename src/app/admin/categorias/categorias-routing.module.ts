import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCategoriaComponent } from './add-edit-categoria/add-edit-categoria.component';
import { ListadoCategoriasComponent } from './listado-categorias/listado-categorias.component';

const routes: Routes = [
  {
    path:'',
    component:ListadoCategoriasComponent
  },
  {
    path:':id',
    component:AddEditCategoriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
