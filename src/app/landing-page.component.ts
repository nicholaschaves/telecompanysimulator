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
  minutosRestantes: number;
  custoLigacao: number

  phoneCall: PhoneCallValue;

  phoneCallLog: Array<PhoneCallValue> = [];

  precificacao: boolean = true;
  hasLogToShow: boolean = false;
  showLogTable: boolean = false;


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

    if (this.origem == null || this.origem == undefined) {
      this.toastr.error('O campo origem é obrigatório!');
    } else if (this.destino == null || this.destino == undefined) {
      this.toastr.error('O campo destino é obrigatório!');
    } else if (this.minutos == null || this.minutos == undefined) {
      this.toastr.error('O campo minutos é obrigatório!');
    } else if (this.plano == null || this.plano == undefined) {
      this.toastr.error('O campo plano é obrigatório!');
    } else {

      this.phoneCall = new PhoneCallValue();
      this.precificacao = true;

      if (this.origem == 11 && this.destino == 16) {
        this.custoLigacao = 1.90;

        this.phoneCall.resultSemPlano = this.minutos * this.custoLigacao;

        this.minutosRestantes = this.reduceMinutesAccordingToChosenPlan(this.plano, this.minutos);

        if (this.minutosRestantes > 0) {
          this.phoneCall.resultComPlano = 0;
        } else if (this.minutosRestantes == 0) {
          this.phoneCall.resultComPlano = 0;
        } else if (this.minutosRestantes < 0) {
          this.phoneCall.resultComPlano = Math.abs(this.minutosRestantes) * this.custoLigacao;
        }


      } else if (this.origem == 16 && this.destino == 11) {
        this.custoLigacao = 2.90;

        this.phoneCall.resultSemPlano = this.minutos * this.custoLigacao;

        this.minutosRestantes = this.reduceMinutesAccordingToChosenPlan(this.plano, this.minutos);

        if (this.minutosRestantes > 0) {
          this.phoneCall.resultComPlano = 0;
        } else if (this.minutosRestantes == 0) {
          this.phoneCall.resultComPlano = 0;
        } else if (this.minutosRestantes < 0) {
          this.phoneCall.resultComPlano = Math.abs(this.minutosRestantes) * this.custoLigacao;
        }

      } else if (this.origem == 11 && this.destino == 17) {
        this.custoLigacao = 1.70;

        this.phoneCall.resultSemPlano = this.minutos * this.custoLigacao;

        this.minutosRestantes = this.reduceMinutesAccordingToChosenPlan(this.plano, this.minutos);

        if (this.minutosRestantes > 0) {
          this.phoneCall.resultComPlano = 0;
        } else if (this.minutosRestantes == 0) {
          this.phoneCall.resultComPlano = 0;
        } else if (this.minutosRestantes < 0) {
          this.phoneCall.resultComPlano = Math.abs(this.minutosRestantes) * this.custoLigacao;
        }

      } else if (this.origem == 17 && this.destino == 11) {
        this.custoLigacao = 2.70;

        this.phoneCall.resultSemPlano = this.minutos * this.custoLigacao;

        this.minutosRestantes = this.reduceMinutesAccordingToChosenPlan(this.plano, this.minutos);

        if (this.minutosRestantes > 0) {
          this.phoneCall.resultComPlano = 0;
        } else if (this.minutosRestantes == 0) {
          this.phoneCall.resultComPlano = 0;
        } else if (this.minutosRestantes < 0) {
          this.phoneCall.resultComPlano = Math.abs(this.minutosRestantes) * this.custoLigacao;
        }

      } else if (this.origem == 11 && this.destino == 18) {
        this.custoLigacao = 0.90;

        this.phoneCall.resultSemPlano = this.minutos * this.custoLigacao;

        this.minutosRestantes = this.reduceMinutesAccordingToChosenPlan(this.plano, this.minutos);

        if (this.minutosRestantes > 0) {
          this.phoneCall.resultComPlano = 0;
        } else if (this.minutosRestantes == 0) {
          this.phoneCall.resultComPlano = 0;
        } else if (this.minutosRestantes < 0) {
          this.phoneCall.resultComPlano = Math.abs(this.minutosRestantes) * this.custoLigacao;
        }

      } else if (this.origem == 18 && this.destino == 11) {
        this.custoLigacao = 1.90;

        this.phoneCall.resultSemPlano = this.minutos * this.custoLigacao;

        this.minutosRestantes = this.reduceMinutesAccordingToChosenPlan(this.plano, this.minutos);

        if (this.minutosRestantes > 0) {
          this.phoneCall.resultComPlano = 0;
        } else if (this.minutosRestantes == 0) {
          this.phoneCall.resultComPlano = 0;
        } else if (this.minutosRestantes < 0) {
          this.phoneCall.resultComPlano = Math.abs(this.minutosRestantes) * this.custoLigacao;
        }
      } else {

        this.toastr.error('Os DDDs escolhidos ainda não possuem precificação, verifique a tabela de valores, por gentileza.');
        this.precificacao = false;
      }

      if (this.precificacao) {
        this.phoneCall.origem = this.origem.toString();
        this.phoneCall.destino = this.destino.toString();
        this.phoneCall.minutos = this.minutos;
        this.phoneCall.custoLigacao = this.custoLigacao;

        this.phoneCall.resultComPlanoFixed = this.phoneCall.resultComPlano.toFixed(2);
        this.phoneCall.resultSemPlanoFixed = this.phoneCall.resultSemPlano.toFixed(2);

        this.planos.forEach(plano => {
          if (plano.id == this.plano) {
            this.phoneCall.plano = plano;
          }
        });

        this.phoneCallLog.push(this.phoneCall);

        this.toastr.success(`Custo com plano: R$ ${this.phoneCall.resultComPlanoFixed} | Custo sem plano: R$ ${this.phoneCall.resultSemPlanoFixed}`, `Plano FaleMais${this.plano}`, {
          positionClass: 'toast-bottom-full-width',
          closeButton: true,
          disableTimeOut: true
        });

        console.log(this.phoneCall);

        this.hasLogToShow = true;
      }

    }

  }

  reduceMinutesAccordingToChosenPlan(plano: number, minutos: number) {
    return plano - minutos;
  }

  cleanLocalProperties() {
    this.origem = undefined;
    this.destino = undefined;
    this.plano = undefined;
    this.minutos = undefined;
    this.minutosRestantes = undefined;
    this.custoLigacao = undefined;
  }

  showLogTableOnClick() {
    this.showLogTable = !this.showLogTable;
  }



  ngOnDestroy() {

  }

}