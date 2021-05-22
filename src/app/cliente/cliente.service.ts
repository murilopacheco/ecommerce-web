import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClienteDto} from '../../model/cliente-dto';
import {EMPTY, Observable, Subscription} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private httpCliente: HttpClient,
    private snackbar: MatSnackBar
  ) { }

    clientes: ClienteDto[];

   listarClientes(): Observable<ClienteDto[]> {
     const url = `${environment.config.URL_API}/cliente/` ;
     return this.httpCliente.get<ClienteDto[]>(url).pipe(
       map((clientes) => clientes)
     );
   }
   salvarCliente(cliente: ClienteDto): Observable<ClienteDto>{
     const url = `${environment.config.URL_API}/cliente/add` ;
     return this.httpCliente.post<ClienteDto>(url, cliente).pipe(
          map(obj => obj),
          catchError( (e) => this.errorHandler(e))
        );
   }

  editarCliente(cliente: ClienteDto): Observable<ClienteDto>{
    const url = `${environment.config.URL_API}/cliente/edit` ;
    return this.httpCliente.put<ClienteDto>(url, cliente).pipe(
      map(obj => obj),
      catchError( (e) => this.errorHandler(e))
    );
  }

   errorHandler(e: any): Observable<any>{
      this.showMessage('Ocorreu um erro!', true );
      return EMPTY;
   }

   showMessage(msg: string, isError: boolean = false): void{
      this.snackbar.open(msg, 'X', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: isError ? ['msg-error'] : ['msg-success'],
      });
   }

  bucarClientesPorId(id: number): Observable<ClienteDto> {
    const url = `${environment.config.URL_API}/cliente/` ;
    return this.httpCliente.get<ClienteDto>(url + id).pipe(
      map((cliente) => cliente),
      catchError( (e) => this.errorHandler(e))
    );
  }

  deletarCliente(id: number): void {
    const url = `${environment.config.URL_API}/cliente/delete/` ;
    this.httpCliente.delete<ClienteDto>(url + id).pipe(
      map((cliente) => cliente),
      catchError( (e) => this.errorHandler(e))
    );
  }

}
