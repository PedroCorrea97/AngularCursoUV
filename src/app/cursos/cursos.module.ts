import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCursosComponent } from './listado-cursos/listado-cursos.component';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CursosRoutingModule } from './cursos-routing.module';
import { AddEditCursosComponent } from './add-edit-cursos/add-edit-cursos.component';



@NgModule({
  declarations: [
    ListadoCursosComponent,
    AddEditCursosComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    MaterialModule, 
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CursosModule { }
