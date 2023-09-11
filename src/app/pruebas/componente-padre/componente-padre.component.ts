import { Component, inject } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-componente-padre',
  templateUrl: './componente-padre.component.html',
  styleUrls: ['./componente-padre.component.scss']
})
export class ComponentePadreComponent {
  mensajePadre:string = '';
  private servicioMensajes = inject(MensajesService)

  enviarMensaje(){
    this.servicioMensajes.cambiarMensaje(this.mensajePadre);
  }
}
