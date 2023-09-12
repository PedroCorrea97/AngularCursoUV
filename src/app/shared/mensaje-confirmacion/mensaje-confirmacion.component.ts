import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-mensaje-confirmacion',
    templateUrl: './mensaje-confirmacion.component.html',
    styleUrls: ['./mensaje-confirmacion.component.scss'],
    standalone: true,
    imports: [MatDialogModule, MatButtonModule]
})
export class MensajeConfirmacionComponent  implements OnInit {
  message!: string;
  textAcept = 'Si';
  constructor( public dialogRef : MatDialogRef <MensajeConfirmacionComponent>, @Inject (MAT_DIALOG_DATA) public data: {message:string;} ){}

  ngOnInit(){ this.message = this.data.message }

  close(){ this.dialogRef.close(); }
}
