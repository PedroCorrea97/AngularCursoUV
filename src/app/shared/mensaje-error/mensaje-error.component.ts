import { Component, OnInit, Inject} from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mensaje-error',
  templateUrl: './mensaje-error.component.html',
  styleUrls: ['./mensaje-error.component.scss']
})
export class MensajeErrorComponent implements OnInit {
message!:string;

  constructor(@Inject ( MAT_SNACK_BAR_DATA )  public data: { mensaje:string },
  public matSnackbar: MatSnackBarRef<MensajeErrorComponent> ){}

ngOnInit(){
  this.message = this.data.mensaje;
}

}
