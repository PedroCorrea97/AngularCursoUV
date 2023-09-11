import { Component, OnInit, inject } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-componente-primo',
  templateUrl: './componente-primo.component.html',
  styleUrls: ['./componente-primo.component.scss']
})
export class ComponentePrimoComponent {
private servcioMensajes=inject(MensajesService)
mensaje$ = this.servcioMensajes.mensaje$;

  // ngOnInit(): void {
  //   this.servcioMensajes.mensaje$.subscribe( mensaje => {
  //     this.mensajePrimo = mensaje;
  //   })
  // }
}
