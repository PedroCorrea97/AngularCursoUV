import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Direction, BidiModule } from '@angular/cdk/bidi';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [MatSidenavModule, BidiModule, MatToolbarModule, MatIconModule, RouterLink, MatListModule, NgIf, MatButtonModule, MatMenuModule, RouterOutlet, AsyncPipe]
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
