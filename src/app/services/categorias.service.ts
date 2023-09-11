import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Paginacion } from '../models/paginacion';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  apiURL = environment.apiurl;
  private http=inject(HttpClient);

  getCategorias(pageIndex: number, pageSize: number):Observable<Paginacion <Categoria>> {
    return this.http.get<Paginacion<Categoria>>(`${this.apiURL}`+`/Categorias`, 
    { params: new HttpParams().set('pageIndex', pageIndex.toString()).set('pageSize', pageSize.toString())}).pipe(catchError(this.handleError))
  }

  getById(id:number):Observable<Categoria>{ 
    return id > 0 ? this.http.get<Categoria>(`${this.apiURL}/categorias/${id}`).pipe(catchError(this.handleError)) : of({id:0, nombre:''}); }
  
  addCategoria(payload:Categoria): Observable<Categoria>{ 
    return this.http.post<Categoria>(`${this.apiURL}/categorias`, payload).pipe(catchError(this.handleError)) }

  update(id:number, payload: Categoria): Observable<Categoria>{ 
    return this.http.put<Categoria>(`${this.apiURL}/categorias/${id}`, payload).pipe(catchError(this.handleError)) }

  delete(id:number){ 
    return this.http.delete(`${this.apiURL}/categorias/${id}`).pipe(catchError(this.handleError)) }
  
  private handleError(err: HttpErrorResponse) { if( err.error instanceof ErrorEvent ) { console.warn('Cliente: ', err.message); }else{ console.warn('Cliente: ', err.status);}
  return throwError(( ) =>  new Error (err.error.message)) }
}