import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProdutoProvider {

  // criado manualmente
  produtosURL = "http://localhost:3000/produtos";

  produtoList: Array<any>;
  selectedProduto: any;

  constructor(public http: HttpClient) { }

  // criado manualmente ~ retorna uma lista de produtos
  getProdutos() {

    return this.http.get<Array<any>>(this.produtosURL);

  }

  // criado manualmente ~ retorna um produto pelo id
  getProduto(id: number) {

    let url = this.produtosURL + '/' + id;

    return this.http.get<any>(url);

  }

  // criado manualmente ~ retona um numero inteiro randomico
  getId(): number {

    let num = Math.random() * 100;
    
    return parseInt( num + "" );
  
  }

  // criado manualmente ~ cria um novo produto
  postProduto(produto: any) {

    produto.id = this.getId();

    let dados = {
      "id" : produto.id,
      "descricao" : produto.descricao,
      "quantidade" : parseInt(produto.quantidade),
      "valor" : parseFloat(produto.valor)
    };

    return this.http.post(this.produtosURL, JSON.stringify(dados) );

  }

  // criado manualmente método para atualização do produto
  putProduto(produto: any) {

    let url = this.produtosURL + '/update/' + produto.id;

    let dados = {
      "id" : parseInt(produto.id),
      "descricao" : produto.descricao,
      "quantidade" : parseInt(produto.quantidade),
      "valor" : parseFloat(produto.valor)
    };

    return this.http.post(url, JSON.stringify(dados) );
  }

  // criado manualmente ~ método para excluir produto
  deleteProduto(id: number) {
    let url = this.produtosURL + '/delete/' + id;

    return this.http.get(url);
  }

}
