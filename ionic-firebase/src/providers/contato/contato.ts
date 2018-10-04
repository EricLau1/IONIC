import { Injectable } from '@angular/core';

// adicionado manualmente
import { AngularFireDatabase } from 'angularfire2/database';
//import { Observable } from 'rxjs';

@Injectable()
export class ContatoProvider {

  private PATH = 'contatos/';

  constructor(private db: AngularFireDatabase) {

  }

  // criado manualmente ~ pega a lista de contatos
  getContatos() {

    // ordenado pelo atributo nome
    return this.db.list(this.PATH, ref => ref.orderByChild('nome'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(contato => ({
          key: contato.payload.key, 
          ...contato.payload.val()
        }));
      }); 
      
  }

  // criado manualmente ~ pega um contato pela chave
  getContato(key : string) {

    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map( contato => {
        return { key: contato.key, ...contato.payload.val() };
      });

  }

  // criado manualmente ~ salvar contato
  salvar(contato : any) {

    return new Promise( (resolve, reject) => {
      
      if (contato.key) {

        // Edit
        this.db.list(this.PATH)
          .update(contato.key, { nome : contato.nome, tel : contato.tel  } )
          .then( () => resolve() )
          .catch( (e) => reject(e) ); 

          /* 
            Outra forma de editar utilizando o SET o objeto é substituido
            pelo objeto modificado podendo conter novos parametros.
            No Update apenas os valores passados como parametro são alterados.

          this.db.list(this.PATH)
            .set(contato.key, { nome : contato.nome, tel : contato.tel  } )
            .then( () => resolve() )
            .catch( (e) => reject(e) );

          */

      } else {

        // New insert
        this.db.list(this.PATH)
        .push( { nome : contato.nome, tel : contato.tel  } )
        .then( (result : any) => resolve(result.key) ); 
      }

    });

  }

  // criado manualmente ~ remover contato
  remover(key : string) {
    return this.db.list(this.PATH).remove(key);
  }

}
