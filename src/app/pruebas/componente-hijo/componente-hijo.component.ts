import { Component, OnInit, inject } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';
import { ComponenteNietoComponent } from '../componente-nieto/componente-nieto.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-componente-hijo',
    templateUrl: './componente-hijo.component.html',
    styleUrls: ['./componente-hijo.component.scss'],
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, ComponenteNietoComponent]
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
