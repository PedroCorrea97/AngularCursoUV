import { CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs";
import { Categoria } from "src/app/models/categoria.model";
import { CategoriasService } from "src/app/services/categorias.service";
import { CursosService } from "src/app/services/cursos.service";

export class CursosDataSurce{
    private categoriasSubject = new BehaviorSubject<Categoria[]>([]);
    private totalCountSubject = new BehaviorSubject<number | undefined>(0);
    public categorias$ = this.categoriasSubject.asObservable();
    public totalCounts$ = this.totalCountSubject.asObservable();
    constructor( private cursosService: CursosService ){ }

    connect(collectionViewer: CollectionViewer){ return this.categorias$; }
    disconnect(collectionViewer: CollectionViewer): void { return this.categoriasSubject.complete(); }

    getCursos(pageIndex: number, pageSize: number) { 
        this.cursosService.getCursos(pageIndex, pageSize).subscribe((res) => { this.totalCountSubject.next(res.total); this.categoriasSubject.next(res.registers); })}
}