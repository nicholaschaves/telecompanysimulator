export class Plano {
    id: number;
    descricaoPtBr: string;
    descricaoEnglish: string;



    constructor(id: number, descricaoPtBr: string, descricaoEnglish: string) {
        this.id = id;
        this.descricaoPtBr = descricaoPtBr;
        this.descricaoEnglish = descricaoEnglish;
    }
}