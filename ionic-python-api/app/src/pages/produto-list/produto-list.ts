import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// add manualmente
import { ProdutoProvider } from '../../providers/produto/produto';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-produto-list',
  templateUrl: 'produto-list.html',
})
export class ProdutoListPage {

  produtos : Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: ProdutoProvider, private toast: ToastController) {

      this.provider.getAll().subscribe( (dados) => {
        this.produtos = dados;
        console.log(this.produtos);
      });

  }

  cadastrarProduto() {
    this.navCtrl.push("ProdutoPage");
  }

  editarProduto(produto: any) {
    this.navCtrl.push("ProdutoEditPage", { produto: produto });
  }

  excluirProduto(produto: any) {
   
    this.provider.deleteProduto(produto.id)
      .subscribe(
        resposta => {

          console.log(resposta);
          this.produtos = this.produtos.filter( p => p != produto );
          this.toast.create({ message: "Excluido com sucesso!", duration: 3000, position: 'bottom'}).present();

      }, error => {

        console.log(error);
        this.toast.create({ message: "Falha ao excluir.", duration: 3000, position: 'bottom'}).present();

      });

  }

  logout() {
    this.navCtrl.setRoot(HomePage);
  }

}
