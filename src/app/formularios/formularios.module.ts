import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulariosRoutingModule } from './formularios-routing.module';
import { NotaVentaComponent } from './nota-venta/nota-venta.component';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

const components = [NotaVentaComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormulariosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class FormulariosModule {}
