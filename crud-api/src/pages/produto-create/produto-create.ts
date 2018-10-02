import { Component} from '@angular/core';
// ToastController adicionado manualmente
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// adiciondos manualmente
import { Produto, ProdutoProvider } from '../../providers/produto/produto';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-produto-create',
  templateUrl: 'produto-create.html',
})
export class ProdutoCreatePage {

  model: Produto;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: ProdutoProvider, private toast: ToastController) {

    this.model = {
      Id: (this.provider.key + 1),
      Descricao: "",
      Quantidade: null,
      Valor: null
    };

    this.provider.key++;
 
  }

  save() {

    this.provider.postProduto(this.model).subscribe(
      (rep) => {
        this.toast.create({ message: "produto criado com sucesso!", duration: 3000, position: 'bottom' }).present();
        this.navCtrl.setRoot(HomePage);
      }
    );

  }


}
