import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// adicionado manualmente
import { ProdutoProvider } from '../../providers/produto/produto';

@IonicPage()
@Component({
  selector: 'page-produto-list',
  templateUrl: 'produto-list.html',
})
export class ProdutoListPage {

  // criado manualmente
  produtos: Array<any>;

  // modificado manualmente
  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: ProdutoProvider) {

    this.provider.getProdutos().subscribe( dados => {
      this.provider.produtoList = dados;
      this.produtos = this.provider.produtoList;
    });

  } // fim construtor

  // criado manualmente
  novoProduto() {
    this.navCtrl.push("ProdutoCreatePage");
  }

  detalhesProduto(produto : any) {

    this.navCtrl.push("ProdutoDetalhesPage", { produto: produto } );

  }

}
