import { Component, OnDestroy, OnInit } from '@angular/core';
import * as planosFromJson from '../app/datastore/planos.json';
import { Plano } from './models/plano';
import { ToastrService } from 'ngx-toastr';
import { PhoneCallValue } from './models/phoneCallValue';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})

export class LandingPageComponent implements OnInit, OnDestroy {

  constructor(private toastr: ToastrService) { }

  planos: Array<Plano>;
  verValores: boolean = false;

  origem: number;
  destino: number;
  minutos: number;
  plano: number;

  phoneCall: PhoneCallValue;

  phoneCallLog: Array<PhoneCallValue> = [];


  ngOnInit() {

    this.chargePlanos();

  }

  chargePlanos() {
    this.planos = [];

    planosFromJson.forEach(plano => {
      this.planos.push(plano);
    });
  }

  showValuesTable() {
    this.verValores = !this.verValores;
  }

  calculateCharge() {

    // to do: regras matemáticas

    if (this.origem == null || this.origem == undefined) {
      this.toastr.error('O campo origem é obrigatório!');
    } else if (this.destino == null || this.destino == undefined) {
      this.toastr.error('O campo destino é obrigatório!');
    } else if (this.minutos == null || this.minutos == undefined) {
      this.toastr.error('O campo minutos é obrigatório!');
    } else if (this.plano == null || this.plano == undefined) {
      this.toastr.error('O campo plano é obrigatório!');
    } else {

      this.toastr.success('Calculando!');

      this.phoneCall = new PhoneCallValue();

      this.phoneCall.origem = this.origem.toString();
      this.phoneCall.destino = this.destino.toString();
      this.phoneCall.tempo = this.minutos;

      this.planos.forEach(plano => {
        if (plano.id == this.plano) {
          this.phoneCall.plano = plano;
        }
      });

      console.log(this.phoneCall);

      this.phoneCallLog.push(this.phoneCall);
      console.log(this.phoneCallLog);


    }

  }



  ngOnDestroy() {

  }

}