import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoCursosComponent } from './listado-cursos/listado-cursos.component';
import { AddEditCursosComponent } from './add-edit-cursos/add-edit-cursos.component';

const routes: Routes = [
{ path:'', component:ListadoCursosComponent },
{ path:':id', component:AddEditCursosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
