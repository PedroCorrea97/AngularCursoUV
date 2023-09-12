import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { SharedModule } from './app/shared/shared.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { JwtInterceptor } from './app/interceptors/jwt.interceptor';
import { LoadingInterceptor } from './app/interceptors/loading.interceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { getPaginatorIntl } from './app/shared/customPaginatorint.util';
import { MatPaginatorIntl } from '@angular/material/paginator';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(RouterModule, BrowserModule, AppRoutingModule, SharedModule),
        { provide: MatPaginatorIntl, useValue: getPaginatorIntl() }, { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
