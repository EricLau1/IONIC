import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// adicionados manualmente
import { ProdutoProvider, Produto } from '../../providers/produto/produto';
import { ProdutoCreatePage } from '../produto-create/produto-create';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  produtos: Array<Produto>;
  
  constructor(public navCtrl: NavController, private provider: ProdutoProvider) {

    this.provider.getProdutos().subscribe((dados) => {
      this.produtos = dados;
      console.log(dados);
    });

  }

  create() {

    this.navCtrl.push("ProdutoCreatePage");

  }

  details(produto: Produto) {

    this.navCtrl.push("ProdutoDetalhesPage", {produto: produto} );

  }

}
