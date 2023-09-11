import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotaVentaComponent } from './nota-venta/nota-venta.component';

const routes: Routes = [{ path: 'nota-ventas', component: NotaVentaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulariosRoutingModule {}
