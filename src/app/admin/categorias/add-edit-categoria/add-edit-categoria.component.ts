import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { MensajeErrorComponent } from 'src/app/shared/mensaje-error/mensaje-error.component';

@Component({
  selector: 'app-add-edit-categoria',
  templateUrl: './add-edit-categoria.component.html',
  styleUrls: ['./add-edit-categoria.component.scss']
})
export class AddEditCategoriaComponent implements OnInit {
  form!:FormGroup;
  id: number = 0;
  idParam: string = 'id';
  controlForm = (propiedad: string) => this.form.controls[propiedad];

  constructor( private servicioCategorias : CategoriasService, 
    private formbuilder: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
      this.form = this.formbuilder.group(
        { nombre: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(250) ]]}
        );
        this.id = this.aRoute.snapshot.params[this.idParam] ? + this.aRoute.snapshot.params[this.idParam] : 0;
        this.servicioCategorias.getById(this.id).subscribe( resp => { this.form.patchValue(resp); console.log(resp);
         })
    }

    get nombre() { return this.controlForm('nombre') }

    AddCategoria(){
      if( this.form.valid ){
        const payload:Categoria = {
          id: this.id,
          ... this.form.value
        };
        if(this.id > 0 ){
          this.servicioCategorias.update(this.id, payload).subscribe( { next: (resp) => {
            this.snackBar.open('La categoria a sido editada.', '',{
              duration: 3500 });
              this.router.navigate(['admin/categorias']);
          }, error: ( err ) => { this.snackBar.openFromComponent(MensajeErrorComponent , { duration:3000, data: {mensaje:err.message} }) }})
        }
        else{
          this.servicioCategorias.addCategoria(payload).subscribe( { next: (resp) => { 
            this.snackBar.open('La categoria a sido agregada.', '', {
              duration: 3500 });
              this.router.navigate(['admin/categorias']); }, error: ( err ) => { this.snackBar.openFromComponent(MensajeErrorComponent , { duration:3000, data: {mensaje:err.message} }) } } );
        }
      }else {this.form.markAllAsTouched()}
    }

}