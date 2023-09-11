import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CategoriasDataSurce } from './categorias.data-source';
import { CategoriasService } from 'src/app/services/categorias.service';
import { tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-listado-categorias',
  templateUrl: './listado-categorias.component.html',
  styleUrls: ['./listado-categorias.component.scss']
})
export class ListadoCategoriasComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource! : CategoriasDataSurce;
  pageRegister = 8;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre', 'acciones'];
  constructor( private servicioCategorias: CategoriasService, private dialog: MatDialog, private snakcBar: MatSnackBar, private cdr: ChangeDetectorRef ) { this.dataSource =  new CategoriasDataSurce(servicioCategorias) }

  ngAfterViewInit() { this.paginator.page.pipe(tap(()=>{ this.dataSource.getCategorias(this.paginator.pageIndex + 1, this.paginator.pageSize) })).subscribe(); }
  ngOnInit() { this.chargeCat(); }
  private chargeCat() { this.dataSource.getCategorias(1, this.pageRegister); }

  deleteCategoria(categoria: Categoria){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, { width: '360', data:{ message: '¿Desea eliminar la categoria? ' + categoria.nombre} })
    dialogRef.afterClosed().subscribe( resp => { if (resp == 'Si') { this.servicioCategorias.delete(categoria.id).subscribe ( resp => 
      { this.chargeCat(); this.snakcBar.open(' La categoria fue elimnada con exito ',  '', { duration:3000}); }); } this.cdr.detectChanges(); } )
  }

}
