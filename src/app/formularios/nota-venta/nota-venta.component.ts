import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nota-venta',
  templateUrl: './nota-venta.component.html',
  styleUrls: ['./nota-venta.component.scss'],
})
export class NotaVentaComponent implements OnInit {
  private snackBar = inject(MatSnackBar)
  private fb = inject(FormBuilder);
  reactiveform!: FormGroup;
  controlForm = (propiedad: string) => this.reactiveform.controls[propiedad];

  get numnota() { return this.controlForm('numnota'); }
  get name() { return this.controlForm('name'); }
  get email() { return this.controlForm('email'); }
  get addConcepto() { return this.controlForm('concepto'); }
  get addCantidad() { return this.controlForm('cantidad'); }
  get conceptsFormArrays ():FormArray { return this.reactiveform.get('conceptos') as FormArray; }

  ngOnInit() {
    this.reactiveform = this.fb.group({
      numnota: ['', [Validators.required]],
      name: [ '', [ Validators.required, Validators.minLength(5), Validators.maxLength(256)], ],
      email: ['', [Validators.required, Validators.email]],
      addConcepto: ['', [Validators.required, Validators.email]],
      addCantidad: ['', [Validators.required, Validators.email]],
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
    }
    else{ this.snackBar.open('¡Es necesario escribir el concepto y la cantidad a agregar!', '', {duration: 3000}); }
   }
}
