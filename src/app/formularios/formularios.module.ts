import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulariosRoutingModule } from './formularios-routing.module';
import { NotaVentaComponent } from './nota-venta/nota-venta.component';

import { ReactiveFormsModule } from '@angular/forms';

const components = [NotaVentaComponent];

@NgModule({
    imports: [
    CommonModule,
    FormulariosRoutingModule,
    ReactiveFormsModule,
    ...components,
],
})
export class FormulariosModule {}
