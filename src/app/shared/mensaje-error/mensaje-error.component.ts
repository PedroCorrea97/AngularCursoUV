import { Component, OnInit, Inject} from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-mensaje-error',
    templateUrl: './mensaje-error.component.html',
    styleUrls: ['./mensaje-error.component.scss'],
    standalone: true,
    imports: [MatSnackBarModule, MatButtonModule]
})
export class MensajeErrorComponent implements OnInit {
message!:string;

  constructor(@Inject ( MAT_SNACK_BAR_DATA )  public data: { mensaje:string },
  public matSnackbar: MatSnackBarRef<MensajeErrorComponent> ){}

ngOnInit(){
  this.message = this.data.mensaje;
}

}
