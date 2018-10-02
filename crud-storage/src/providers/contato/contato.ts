import { Injectable } from '@angular/core';

// adicionados manualmente
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

@Injectable()
export class ContatoProvider {

  constructor( private storage: Storage, private datepipe: DatePipe ) { }

  public insert(contato: Contato) {

    //gerar chave unica
    let chave = this.datepipe.transform(new Date(), "ddMMyyyHHmmss");

    return this.save(chave, contato);

  }

  public update(chave: string, contato: Contato) {

    return this.save(chave, contato);

  }

  private save(chave: string, contato: Contato) {

    return this.storage.set(chave, contato);

  }

  public remove(chave: string) {

    return this.storage.remove(chave);

  }

  public getAll() {

    let contatos: Array<ContatoList> = [];

    return this.storage.forEach((value: Contato, chave: string, iterationNumber: Number) => {

      let contato = new ContatoList();

      contato.chave = chave;
      contato.contato = value;

      contatos.push(contato);
     // console.log(contatos);

    })
    .then(() => {
      return Promise.resolve(contatos);
    })
    .catch((erro) => {
      return Promise.reject(erro);
    });

  }

}

export class Contato {
  nome: string;
  telefone: number;
  nascimento: Date;
  ativo: boolean;
}

export class ContatoList {
  chave: string;
  contato: Contato;
}
