import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(this.addToken(request));
  }

  private addToken(req: HttpRequest<any>) {
    if (this.authService.currentAccesToken) {
      return req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authService.currentAccesToken}`,
        }),
      });
    } else {
      return req;
    }
  }
}
