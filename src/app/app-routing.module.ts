import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path:'login', loadChildren:()=> import ('./auth/auth.module').then(m => m.AuthModule) },
  { path:'admin', loadChildren:()=> import ('./admin/admin.module').then(m => m.AdminModule), canMatch:[authGuard] },
  { path:'', redirectTo:'login', pathMatch:'full' },
  { path:'**', redirectTo:'login' }
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes), ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
