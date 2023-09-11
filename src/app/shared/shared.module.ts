import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeConfirmacionComponent } from './mensaje-confirmacion/mensaje-confirmacion.component';
import { MaterialModule } from './material/material.module';
import { MensajeErrorComponent } from './mensaje-error/mensaje-error.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { UvClassDirective } from './uv-class.directive';
import { UvIfDirective } from './uv-if.directive';

const components = [MensajeConfirmacionComponent, MensajeErrorComponent, SpinnerComponent, UvClassDirective, UvIfDirective];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }
