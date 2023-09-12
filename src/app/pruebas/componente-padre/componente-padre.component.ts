import { Component, inject } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';
import { ComponentePrimoComponent } from '../componente-primo/componente-primo.component';
import { ComponenteHijoComponent } from '../componente-hijo/componente-hijo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-componente-padre',
    templateUrl: './componente-padre.component.html',
    styleUrls: ['./componente-padre.component.scss'],
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ComponenteHijoComponent, ComponentePrimoComponent]
})
export class ComponentePadreComponent {
  mensajePadre:string = '';
  private servicioMensajes = inject(MensajesService)

  enviarMensaje(){
    this.servicioMensajes.cambiarMensaje(this.mensajePadre);
  }
}
