import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cursos } from 'src/app/models/cursos.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CursosService } from 'src/app/services/cursos.service';
import { MensajeErrorComponent } from 'src/app/shared/mensaje-error/mensaje-error.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-add-edit-cursos',
    templateUrl: './add-edit-cursos.component.html',
    styleUrls: ['./add-edit-cursos.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, NgFor, MatOptionModule, NgIf, MatInputModule, MatDatepickerModule, MatButtonModule, MatIconModule, RouterLink]
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
