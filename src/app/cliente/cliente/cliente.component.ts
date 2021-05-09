import { Component, OnInit } from '@angular/core';
import {ClienteDto} from '../../../model/cliente-dto';
import {ClienteService} from '../cliente.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(
    private clienteService: ClienteService,
    private location: Location
  ) { }

  displayedColumns: string[] = ['id', 'nome', 'cpf'];

  cliente: ClienteDto = {
    id: 0,
    nome: 'ClienteService Angular',
    cpf: '01446294102',
    primeiroNome: 'ClienteService',
    dataNascimento: new Date(2001, 1, 1),
    versao: 1
  };
  //   {id: 2, nome: 'Cliente 2', cpf: '222.222.222-22', primeiroNome: 'Cliente 2', dataNascimento: new Date(2002,2,2), versao: 1 },
  //   {id: 3, nome: 'Cliente 3', cpf: '333.333.333-33', primeiroNome: 'Cliente 3', dataNascimento: new Date(2003,3,3), versao: 1 }
  // ];

  clientes: ClienteDto[];

  dataSource;

  ngOnInit(): void {
    this.clienteService.listarClientes().subscribe(dados => {
          this.clientes = dados;
          this.dataSource = this.clientes;
    });
  }

  salvar(): void {
   this.clienteService.salvarCliente(this.cliente).subscribe((dados) => {
        this.clienteService.showMessage('Cliente Salvo com sucesso!', false);
        this.clientes.push(dados);
        this.dataSource = this.clientes;
        location.reload();
   });
  }
}
