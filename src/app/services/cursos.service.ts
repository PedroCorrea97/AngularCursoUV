import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Cursos } from '../models/cursos.model';
import { Paginacion } from '../models/paginacion';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  apiURL = environment.apiurl;
  private http=inject(HttpClient);

  getCursos(pageIndex: number, pageSize: number):Observable<Paginacion <Cursos>> {
    return this.http.get<Paginacion<Cursos>>(`${this.apiURL}`+`/cursos`, 
    { params: new HttpParams().set('pageIndex', pageIndex.toString()).set('pageSize', pageSize.toString())}).pipe(catchError(this.handleError))
  }

  // getById(id:number):Observable<Cursos>{ 
  //   return id > 0 ? this.http.get<Cursos>(`${this.apiURL}/cursos/${id}`).pipe(catchError(this.handleError)) : of({id:0, nombre:''}); }
  
  addCurso(payload:Cursos): Observable<Cursos>{ 
    return this.http.post<Cursos>(`${this.apiURL}/categorias`, payload).pipe(catchError(this.handleError)) }

  update(id:number, payload: Cursos): Observable<Cursos>{ 
    return this.http.put<Cursos>(`${this.apiURL}/categorias/${id}`, payload).pipe(catchError(this.handleError)) }

  delete(id:number){ 
    return this.http.delete(`${this.apiURL}/categorias/${id}`).pipe(catchError(this.handleError)) }
  
  private handleError(err: HttpErrorResponse) { if( err.error instanceof ErrorEvent ) { console.warn('Cliente: ', err.message); }else{ console.warn('Cliente: ', err.status);}
  return throwError(( ) =>  new Error (err.error.message)) }
}
