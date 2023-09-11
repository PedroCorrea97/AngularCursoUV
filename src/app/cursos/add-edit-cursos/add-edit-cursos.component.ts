import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cursos } from 'src/app/models/cursos.model';
import { CursosService } from 'src/app/services/cursos.service';
import { MensajeErrorComponent } from 'src/app/shared/mensaje-error/mensaje-error.component';

@Component({
  selector: 'app-add-edit-cursos',
  templateUrl: './add-edit-cursos.component.html',
  styleUrls: ['./add-edit-cursos.component.scss']
})
export class AddEditCursosComponent {
  form!:FormGroup;
  id = 0;
  idParam: string = 'id';
  controlForm = (propiedad: string) => this.form.controls[propiedad];

  constructor( private servicioCursos : CursosService, 
    private formbuilder: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
      this.form = this.formbuilder.group(
        { nombre: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(250) ]]}
        );
        this.id = this.aRoute.snapshot.params[this.idParam] ? +this.aRoute.snapshot.params[this.idParam] : 0;
        this.servicioCursos.getById(this.id).subscribe( resp => { this.form.patchValue(resp);
         })
    }

    get nombre() { return this.controlForm('nombre') }

    AddCurso(){
      if( this.form.valid ){
        const payload:Cursos = {
          id: this.id,
          ... this.form.value
        };
        if(this.id > 0 ){
          this.servicioCursos.update(this.id, payload).subscribe( { next: (resp) => {
            this.snackBar.open('El cursos a sido editada.', '',{
              duration: 3500 });
              this.router.navigate(['admin/cursos']);
          }, error: ( err ) => { this.snackBar.openFromComponent(MensajeErrorComponent , { duration:3000, data: {mensaje:err.message} }) }})
        }
        else{
          this.servicioCursos.addCurso(payload).subscribe( { next: (resp) => { 
            this.snackBar.open('El curso a sido agregada.', '', {
              duration: 3500 });
              this.router.navigate(['admin/curso']); }, error: ( err ) => { this.snackBar.openFromComponent(MensajeErrorComponent , { duration:3000, data: {mensaje:err.message} }) } } );
        }
      }else {this.form.markAllAsTouched()}
    }

}
