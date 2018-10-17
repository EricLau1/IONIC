import { Injectable } from '@angular/core';

// adicionado manualmente
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProdutoProvider {

  private PATH = "produtos/";

  constructor(private database: AngularFireDatabase) {

  }

  // método que retorna uma lista
  getProdutos() {

    return this.database.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(produto => ({
          key: produto.payload.key,
          ...produto.payload.val()
        }));
      });

  }


  // método que retorna um produto pela chave
  getProduto(key: string) {

    return this.database.object(this.PATH + key)
      .snapshotChanges()
      .map( produto => {
        return { key: produto.key, ...produto.payload.val() };
      });

  }


  save(produto: any) {

    return new Promise( (resolve, reject) => {

      if(produto.key) {

        // Atualiza o produto

        this.database.list(this.PATH)
          .update(produto.key, { descricao: produto.descricao, quantidade: produto.quantidade, valor: produto.valor } )
          .then( () => resolve() )
          .catch( (e) => reject(e) );
      
      } else {

        // Cria um novo produto

        this.database.list(this.PATH)
          .push( { descricao: produto.descricao, quantidade: produto.quantidade, valor: produto.valor } )
          .then( (result: any) => resolve(result.key) );

      }

    });

  }

  deleteProduto(key: string) {

    return this.database.list(this.PATH).remove(key);
      
  }

}
