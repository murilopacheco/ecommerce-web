import { Component, OnInit } from '@angular/core';
import {ClienteService} from '../cliente.service';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ClienteDto} from '../../../model/cliente-dto';
import {DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

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

  constructor( private clienteService: ClienteService,
               private fb: FormBuilder
  ) { }

  cliente: ClienteDto;

  cpf = new FormControl('', [
    Validators.required,
  ]);

  nomeControl = new FormControl('', [
    Validators.required,
    Validators.pattern('a-zA-Z')
  ]);

  primeiroNome = new FormControl('', [
    Validators.required,
  ]);

  id = new FormControl([]);

matcher = new MyErrorStateMatcher();
formCliente = this.fb.group({
    nome: new FormControl([])
  });


  ngOnInit(): void {
  }

  onSubmit(): void{
    this.cliente = this.formCliente.value;
    alert(this.cliente.nome);
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return false;
  }

}
