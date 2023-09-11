import { CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs";
import { Categoria } from "src/app/models/categoria.model";
import { CategoriasService } from "src/app/services/categorias.service";

export class CategoriasDataSurce{
    private categoriasSubject = new BehaviorSubject<Categoria[]>([]);
    private totalCountSubject = new BehaviorSubject<number | undefined>(0);
    public categorias$ = this.categoriasSubject.asObservable();
    public totalCounts$ = this.totalCountSubject.asObservable();
    constructor( private categoriaService: CategoriasService ){ }

    connect(collectionViewer: CollectionViewer){ return this.categorias$; }
    disconnect(collectionViewer: CollectionViewer): void { return this.categoriasSubject.complete(); }

    getCategorias(pageIndex: number, pageSize: number) { 
        this.categoriaService.getCategorias(pageIndex, pageSize).subscribe((res) => { this.totalCountSubject.next(res.total); this.categoriasSubject.next(res.registers); })}
}