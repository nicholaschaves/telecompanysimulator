import { Plano } from './plano';

export class PhoneCallValue {
    origem: string;
    destino: string;
    minutos: number; // minutes
    plano: Plano;
    custoLigacao: number;
    resultComPlano: number;
    resultSemPlano: number;

    resultComPlanoFixed: string;
    resultSemPlanoFixed: string;
}