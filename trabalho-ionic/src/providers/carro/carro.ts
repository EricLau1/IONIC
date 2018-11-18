import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CarroProvider {

  private PATH = 'carros/';

  constructor(private firebase: AngularFireDatabase) {
  
  }

  getCarros() {

    return this.firebase.list(this.PATH)
      .snapshotChanges()
      .map( changes => {
        return changes.map( carro => ({
          key: carro.payload.key,
          ...carro.payload.val()
        }));
      });

  }

  getCarro(key: string) {

    return this.firebase.object(this.PATH + key)
      .snapshotChanges()
      .map( carro => {
        return { key: carro.key, ...carro.payload.val() };
      });
  }

  save(carro: any) {

    return new Promise((resolve, reject) => {

      if(carro.key) {

        // atualiza os dados do cliente
        this.firebase.list(this.PATH)
          .update(carro.key, { nome: carro.nome, marca: carro.marca, valor: carro.valor } )
          .then( () => resolve() )
          .catch( (error) => reject(error) );

      } else {

        // Cadastrar novo cliente
        this.firebase.list(this.PATH)
          .push( { nome: carro.nome, marca: carro.marca, valor: carro.valor } )
          .then( (result : any) => resolve(result.key) );

      }

    });

  }


  deleteCarro(key : string) {

    return this.firebase.list(this.PATH).remove(key);

  }
}
