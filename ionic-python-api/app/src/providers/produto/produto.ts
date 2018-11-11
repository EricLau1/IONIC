import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProdutoProvider {

  private URI_ROOT = "http://localhost:5000/";

  constructor(public http: HttpClient) {
    
  }

  getAll() {

    return this.http.get<Array<any>>(this.URI_ROOT);

  }

  getProduto(id: string) {

    let url = this.URI_ROOT + 'produto/' + id;

    return this.http.get<any>(url);

  }

  postProduto(produto: any) {

    let dados = {
      "descricao": produto.descricao,
      "preco": parseFloat(produto.preco),
      "quantidade": parseInt(produto.quantidade)
    };

    console.log(dados);

    let url = this.URI_ROOT + 'produto';

    return this.http.post(url, JSON.stringify(dados));

  }

  putProduto(produto: any) {

    let dados = {
      "id": parseInt(produto.id),
      "descricao": produto.descricao,
      "preco": parseFloat(produto.preco),
      "quantidade": parseInt(produto.quantidade)
    };

    let url = this.URI_ROOT + 'update/' + produto.id;

    return this.http.put(url, JSON.stringify(dados));
  }

  deleteProduto(id: string) {

    let url = this.URI_ROOT + 'delete/' + id;

    return this.http.delete(url);

  }
}
