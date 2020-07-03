import { Plano } from './plano';

export class PhoneCallValue {
    origem: string;
    destino: string;
    tempo: number; // minutes
    plano: Plano;
    resultComPlano: number;
    resultSemPlano: number;
}