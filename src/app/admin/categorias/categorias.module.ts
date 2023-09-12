import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { AddEditCategoriaComponent } from './add-edit-categoria/add-edit-categoria.component';
import { ListadoCategoriasComponent } from './listado-categorias/listado-categorias.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    imports: [
    CommonModule,
    CategoriasRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AddEditCategoriaComponent,
    ListadoCategoriasComponent
]
})
export class CategoriasModule { }
