import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteComponent} from './cliente/cliente.component';
import {ClienteDeltalheComponent} from './cliente-deltalhe/cliente-deltalhe.component';
import {AuthGuard} from '../guards/auth.guard';

const clienteRoutes: Routes = [
  {path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard]},
  {path: 'cliente-detalhe', component: ClienteDeltalheComponent, canActivate: [AuthGuard]},
  {path: 'cliente-detalhe/:id', component: ClienteDeltalheComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(clienteRoutes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
