import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { Categoria } from 'src/app/models/categoria.model';
import { CursosService } from 'src/app/services/cursos.service';
import { CursosDataSurce } from './cursos.data';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss']
})
export class ListadoCursosComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource! : CursosDataSurce;
  pageRegister = 8;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre', 'precio', 'descripción', 'Fecha Creación', 'acciones'];
  constructor( private cursosService: CursosService, private dialog: MatDialog, private snakcBar: MatSnackBar, private cdr: ChangeDetectorRef ) { this.dataSource =  new CursosDataSurce(cursosService) }

  ngAfterViewInit() { this.paginator.page.pipe(tap(()=>{ this.dataSource.getCursos(this.paginator.pageIndex + 1, this.paginator.pageSize) })).subscribe(); }
  ngOnInit() { this.chargeCat(); }
  
  private chargeCat() { this.dataSource.getCursos(1, this.pageRegister); 
  console.log();
   }

  deleteCursos(categoria: Categoria){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, { width: '360', data:{ message: '¿Desea eliminar el curso ? ' + categoria.nombre} })
    dialogRef.afterClosed().subscribe( resp => { if (resp == 'Si') { this.cursosService.delete(categoria.id).subscribe ( resp => 
      { this.chargeCat(); this.snakcBar.open(' El curso fue elimnado con exito ',  '', { duration:3000}); }); } this.cdr.detectChanges(); } )
  }

}