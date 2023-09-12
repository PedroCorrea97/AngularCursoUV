import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cursos } from 'src/app/models/cursos.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CursosService } from 'src/app/services/cursos.service';
import { MensajeErrorComponent } from 'src/app/shared/mensaje-error/mensaje-error.component';

@Component({
  selector: 'app-add-edit-cursos',
  templateUrl: './add-edit-cursos.component.html',
  styleUrls: ['./add-edit-cursos.component.scss']
})
export class AddEditCursosComponent {
  formCursos!:FormGroup;
  id = 0;
  idParam: string = 'id';
  allCategorias!: any[];
  controlForm = (propiedad: string) => this.formCursos.controls[propiedad];

  constructor( private servicioCursos : CursosService,
    private servicioCategorias : CategoriasService,
    private formbuilder: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private snackBar: MatSnackBar
    ) { }

    get nombre() { return this.controlForm('nombre') }
    get precio() { return this.controlForm('precio') }
    get descripcion() { return this.controlForm('descripcion') }
    get fechaCreacion() { return this.controlForm('fechaCreacion') }
    get categoriaid() { return this.controlForm('categoriaid') }

    ngOnInit() {
      this.formCursos = this.formbuilder.group(
        { nombre: ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(30) ]],
          precio: ['', [ Validators.required, Validators.min(100) ]],
          descripcion: ['', [ Validators.required ]],
          fechaCreacion: ['', [ Validators.required ]],
          categoriaid: ['', [ Validators.required ]],
      
      });
        this.id = this.aRoute.snapshot.params[this.idParam] ? +this.aRoute.snapshot.params[this.idParam] : 0;
        this.servicioCursos.getById(this.id).subscribe( resp => { this.formCursos.patchValue(resp);
         })
         this.servicioCategorias.getAll().subscribe(( resp => { this.allCategorias = resp }));
    }

    AddCurso(){
      if( this.formCursos.valid ){
      console.log(this.formCursos.value);
        const payload:Cursos = {
          id: this.id,
          ... this.formCursos.value
        };
        if(this.id > 0 ){
          this.servicioCursos.update(this.id, payload).subscribe( { next: (resp) => {
            this.snackBar.open('El curso a sido editada.', '',{
              duration: 3500 });
              this.router.navigate(['admin/cursos']);
          }, error: ( err ) => { this.snackBar.openFromComponent(MensajeErrorComponent , { duration:3000, data: {mensaje:err.message} }) }})
        }
        else{
          this.servicioCursos.addCurso(payload).subscribe( { next: (resp) => { 
            this.snackBar.open('El curso a sido agregado.', '', {
              duration: 3500 });
              this.router.navigate(['admin/cursos']); }, error: ( err ) => { this.snackBar.openFromComponent(MensajeErrorComponent , { duration:3000, data: {mensaje:err.message} }) } } );
        }
      }else {this.formCursos.markAllAsTouched()}
    }

}
