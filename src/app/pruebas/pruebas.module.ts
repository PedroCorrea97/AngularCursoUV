import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentePadreComponent } from './componente-padre/componente-padre.component';
import { ComponenteHijoComponent } from './componente-hijo/componente-hijo.component';
import { ComponenteNietoComponent } from './componente-nieto/componente-nieto.component';
import { ComponentePrimoComponent } from './componente-primo/componente-primo.component';
import { MaterialModule } from '../shared/material/material.module';


const componentes = [ComponentePadreComponent, ComponenteHijoComponent, ComponenteNietoComponent, ComponentePrimoComponent];

@NgModule({
  declarations: [
    ComponentePadreComponent,
    ComponenteHijoComponent,
    ComponenteNietoComponent,
    ComponentePrimoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ComponentePadreComponent,
    ComponenteHijoComponent,
    ComponenteNietoComponent,
    ComponentePrimoComponent
  ]
})
export class PruebasModule { }
