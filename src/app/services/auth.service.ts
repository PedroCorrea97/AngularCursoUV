import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

export interface User {
  username: string;
  password: string;
}

const ACCES_TOKEN = 'ACCES_TOKEN';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  apiURL = environment.apiurl;
  currentAccesToken: string | null = null;
  constructor() {
    this.loadToken();
  }

  loadToken() {
    const token = localStorage.getItem(ACCES_TOKEN);
    if (token) {
      this.currentAccesToken = token;
      this.isAuthenticatedSubject.next(true);
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

  login(username: string, password: string) {
    return this.httpClient
      .post(`${this.apiURL}/account/token`, { username, password })
      .pipe(
        tap((resp: any) => {
          console.log('Entro:', resp);
          localStorage.setItem(ACCES_TOKEN, resp['token']);
          this.currentAccesToken = resp['token'];
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  logOut() {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem(ACCES_TOKEN);
    this.currentAccesToken = null;
  }
}
