import { Component, OnInit } from '@angular/core';
import {ClienteDto} from '../../../model/cliente-dto';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['id', 'nome', 'cpf'];

  clientes: ClienteDto[] = [
    {id: 1, nome: 'Cliente 1', cpf: '111.111.111-11', primeiroNome: 'Cliente 1', dataNascimento: new Date(2001,1,1), versao: 1 },
    {id: 2, nome: 'Cliente 2', cpf: '222.222.222-22', primeiroNome: 'Cliente 2', dataNascimento: new Date(2002,2,2), versao: 1 },
    {id: 3, nome: 'Cliente 3', cpf: '333.333.333-33', primeiroNome: 'Cliente 3', dataNascimento: new Date(2003,3,3), versao: 1 }
  ];

  dataSource = this.clientes;

  ngOnInit(): void {
  }

}
