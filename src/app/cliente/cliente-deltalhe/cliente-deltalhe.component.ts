import { Component, OnInit } from '@angular/core';
import {ClienteService} from '../cliente.service';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ClienteDto} from '../../../model/cliente-dto';
import {DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-cliente-deltalhe',
  templateUrl: './cliente-deltalhe.component.html',
  styleUrls: ['./cliente-deltalhe.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class ClienteDeltalheComponent implements OnInit, ErrorStateMatcher {

  constructor(private clienteService: ClienteService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  cliente: ClienteDto;

  formCliente: FormGroup;

  matcher = new MyErrorStateMatcher();

  inscricao: Subscription;

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: Params) => {
        const id: number = +params.id;
        if (id) {
          this.clienteService.bucarClientesPorId(id).subscribe(dados => {
            this.cliente = dados;
            this.formCliente = this.fb.group({     // {5}
              id: [this.cliente.id],
              nome: [this.cliente.nome, [Validators.required, Validators.minLength(3)]],
              cpf: [this.cliente.cpf, Validators.required],
              primeiroNome: [this.cliente.primeiroNome, [ Validators.required ]],
              dataNascimento: [this.cliente.dataNascimento]
            });
            console.log(this.formCliente);
          }, error => {console.error(error); });
        } else {
          this.cliente = {
            id: null,
            nome: '',
            cpf: '',
            dataNascimento: null,
            primeiroNome: '',
            versao: null
          };
          this.formCliente = this.fb.group({     // {5}
            id: [this.cliente.id],
            nome: [this.cliente.nome, Validators.required],
            cpf: [this.cliente.cpf, Validators.required],
            primeiroNome: [this.cliente.primeiroNome, [ Validators.required ]],
            dataNascimento: [this.cliente.dataNascimento]
          });
        }
      });
  }

  onSubmit(): void {
    this.cliente = this.formCliente.value;
    if (this.cliente.id === null){
      this.clienteService.salvarCliente(this.cliente).subscribe(() => {
        this.clienteService.showMessage('Cliente salvo com sucesso', false);
      });
      this.router.navigate(['/cliente']);
    }else{
      this.clienteService.editarCliente(this.cliente).subscribe(() => {
        this.clienteService.showMessage('Cliente salvo com sucesso', false);
      });
      this.router.navigate(['/cliente']);
    }
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return false;
  }

  get getControl(){
    return this.formCliente.controls;
  }

}
