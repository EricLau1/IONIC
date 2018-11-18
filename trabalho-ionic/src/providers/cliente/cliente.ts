import { Injectable } from '@angular/core';

// add manualmente
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ClienteProvider {

  private PATH = 'clientes/';

  constructor(private firebase: AngularFireDatabase) {
  
  }

  getClientes() {

    return this.firebase.list(this.PATH)
      .snapshotChanges()
      .map( changes => {
        return changes.map( cliente => ({
          key: cliente.payload.key,
          ...cliente.payload.val()
        }));
      });

  }

  getCliente(key: string) {

    return this.firebase.object(this.PATH + key)
      .snapshotChanges()
      .map( cliente => {
        return { key: cliente.key, ...cliente.payload.val() };
      });
  }

  save(cliente: any) {

    return new Promise((resolve, reject) => {

      if(cliente.key) {

        // atualiza os dados do cliente
        this.firebase.list(this.PATH)
          .update(cliente.key, { nome: cliente.nome, email: cliente.email, senha: cliente.senha } )
          .then( () => resolve() )
          .catch( (error) => reject(error) );

      } else {

        // Cadastrar novo cliente
        this.firebase.list(this.PATH)
          .push( { nome: cliente.nome, email: cliente.email, senha: cliente.senha } )
          .then( (result : any) => resolve(result.key) );

      }

    });

  }


  deleteCliente(key : string) {

    return this.firebase.list(this.PATH).remove(key);

  }

}
