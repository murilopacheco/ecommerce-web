import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ClienteComponent} from './cliente/cliente/cliente.component';
import {AuthGuard} from './guards/auth.guard';

const appRouts: Routes = [
  { path: '/login', component: LoginComponent},
  {path: '/home', component: ClienteComponent, canActivate: [AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(appRouts)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
