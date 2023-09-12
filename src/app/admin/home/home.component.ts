import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private servicioCategorias = inject(CategoriasService);
  private authService = inject(AuthService);
  private router = inject(Router);
  isAutenticated$ = this.authService.isAuthenticated$;
  isDarkTheme = false;
  direction: Direction ="ltr";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web).pipe( map(result => result.matches), shareReplay() );

  ngOnInit(){}

  logout(){ this.authService.logOut(); this.router.navigateByUrl('/login'); }

  changeTheme() { this.isDarkTheme = !this.isDarkTheme; }

  changeDirection() { this.direction = this.direction === 'ltr' ? 'rtl' : 'ltr' }
}
