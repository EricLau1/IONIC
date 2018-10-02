import { Component } from '@angular/core';
// ToastController adicionado manualmente
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// adicionados manualmente
import { Produto, ProdutoProvider } from '../../providers/produto/produto';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-produto-detalhes',
  templateUrl: 'produto-detalhes.html',
})
export class ProdutoDetalhesPage {

  produto: Produto;
  key: number; // chave que guarda o Id do produto

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: ProdutoProvider, public alertController: AlertController,
    private toast: ToastController ) {

    this.produto = this.navParams.data.produto || {};
    this.key = this.produto.Id;
    console.log(this.produto);

  }

  remove() {

    this.showConfirm();
  
  }

  showConfirm() {

    const confirm = this.alertController.create({
      title: 'Excluir produto',
      message: 'deseja excluir produto permanentemente?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('operação cancelada');
            this.toast.create({ message: "O produto esta intacto.", duration: 3000,
            position: 'bottom' }).present();
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('excluindo...');

            this.provider.deleteProduto(this.key).subscribe((response) => {

              console.log(response);

              this.toast.create({ message: "exluido com sucesso!", duration: 3000,
                position: 'bottom' }).present();

              this.navCtrl.setRoot(HomePage);
              

            });
          }
        }
      ]
    });
    
   confirm.present();

  }

  update() {

    this.navCtrl.push("ProdutoEditPage", { produto: this.produto });

  }


}
