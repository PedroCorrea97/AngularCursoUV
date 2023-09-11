import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private mensajeSubject:Subject<string> = new Subject<string>();
  public mensaje$ = this.mensajeSubject.asObservable();

  constructor() { }

  cambiarMensaje(mensaje:string){
    this.mensajeSubject.next(mensaje)
  }
}
