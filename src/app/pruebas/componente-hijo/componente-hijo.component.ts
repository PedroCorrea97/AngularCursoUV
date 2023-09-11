import { Component, OnInit, inject } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-componente-hijo',
  templateUrl: './componente-hijo.component.html',
  styleUrls: ['./componente-hijo.component.scss']
})
export class ComponenteHijoComponent implements OnInit {
mensaje:string='';
private servcioMensajes=inject(MensajesService)

ngOnInit(): void {
  this.servcioMensajes.mensaje$.subscribe( mensaje => {
    this.mensaje = mensaje;
  })
}
}
