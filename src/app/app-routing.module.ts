import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteComponent} from './cliente/cliente/cliente.component';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './login/login.component';

const appRouts: Routes = [
  { path: '', component: ClienteComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(appRouts)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
