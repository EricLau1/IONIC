import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ProdutoProvider {

  produtosURL = "http://localhost:3000/produtos";

  key: number;

  constructor(public http: HttpClient) { 
  
    // pega o ultimo Id da lista de objetos
    this.latId();

  
  }

  getProdutos() {

    return this.http.get<Array<Produto>>(this.produtosURL);

  }

  postProduto(produto: Produto) {

    let data = {
      "Id": produto.Id,
      "Descricao": produto.Descricao,
      "Quantidade": parseInt(""+produto.Quantidade),
      "Valor": parseFloat(produto.Valor +"")
    }

    console.log(data);

    let uri =  `${this.produtosURL}/create`;

    return this.http.post( uri ,JSON.stringify(data));

  }

  putProduto(produto: Produto) {

    
    let uri = `${this.produtosURL}/update/${produto.Id}`;

    let dados = {
      "Id": parseInt(produto.Id + ""),
      "Descricao": produto.Descricao,
      "Quantidade": parseInt(produto.Quantidade + ""),
      "Valor": parseFloat(produto.Valor + "")
    };

    return this.http.post( uri, JSON.stringify(dados));

  }


  deleteProduto(id: number) {
    
    let uri = `${this.produtosURL}/delete/${id}`;

    return this.http.get(uri);

  }

  latId() {
    return this.getProdutos().subscribe(
      (dados)=>{ this.key = dados.length; console.log(this.key); }
    );
  }

  

}

export class Produto {
  Id: number;
  Descricao: string;
  Quantidade: number;
  Valor: number;
}
