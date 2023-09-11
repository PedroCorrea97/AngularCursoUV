import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { PruebasModule } from './pruebas/pruebas.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPaginatorIntl } from './shared/customPaginatorint.util';
import { SharedModule } from './shared/shared.module';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    PruebasModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getPaginatorIntl() }, { provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi: true },
    {provide : HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
