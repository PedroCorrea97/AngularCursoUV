import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-nota-venta',
  templateUrl: './nota-venta.component.html',
  styleUrls: ['./nota-venta.component.scss'],
})
export class NotaVentaComponent implements OnInit {
  private snackBar = inject(MatSnackBar)
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialog);
  reactiveform!: FormGroup;
  controlForm = (propiedad: string) => this.reactiveform.controls[propiedad];

  get numnota() { return this.controlForm('numnota'); }
  get name() { return this.controlForm('name'); }
  get email() { return this.controlForm('email'); }
  get addConcepto() { return this.controlForm('addConcepto'); }
  get addCantidad() { return this.controlForm('addCantidad'); }
  get conceptsFormArrays ():FormArray { return this.reactiveform.get('conceptos') as FormArray; }

  ngOnInit() {
    this.reactiveform = this.fb.group({
      numnota: ['', [Validators.required]],
      name: [ '', [ Validators.required, Validators.minLength(5), Validators.maxLength(256)], ],
      email: ['', [Validators.required, Validators.email]],
      addConcepto: [''],
      addCantidad: [''],
      conceptos: this.fb.array([])
    });
  }

  onSubmit() {
    if (this.reactiveform.valid) {
      console.log(this.reactiveform.value);
    } else { this.reactiveform.markAllAsTouched(); }
  }

  addConcept() { 
    if( this.addCantidad.value && this.addConcepto.value ) {
      this.conceptsFormArrays.push( 
        this.fb.group({
          name: [ this.addConcepto.value, [Validators.required] ],
          cantidad: [ this.addCantidad.value, [Validators.required] ]
        })
       );
       this.addConcepto.setValue(''); this.addConcepto.setValue('');
    }
    else{ this.snackBar.open('¡Es necesario escribir el concepto y la cantidad a agregar!', '', {duration: 3000}); }
   }

   deleteConcept(index:number){
    var concept = this.conceptsFormArrays.at(index).get('name')?.value;
    const dialogRef = this.dialogRef.open(MensajeConfirmacionComponent, { 
      width:'350px', 
      data:{message: `¿Estas seguro que desea elimnar el concepto ${concept}?`}}
    );
    dialogRef.afterClosed().subscribe((resp) => {
      if(resp == 'Si') { this.conceptsFormArrays.removeAt(index); }
    })
    
   }
}
