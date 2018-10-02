import { Component } from '@angular/core';
// ToastController adicionado manualmente
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// adicionados manualmente
import { Produto, ProdutoProvider } from '../../providers/produto/produto';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-produto-edit',
  templateUrl: 'produto-edit.html',
})
export class ProdutoEditPage {

  produto: Produto;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: ProdutoProvider, private toast: ToastController,
    private alertController: AlertController) {
  
    this.produto = this.navParams.data.produto || {};

    console.log(this.produto);

  }

  updateProduto() {
    this.showConfirm();
  }

  showConfirm() {

    const confirm = this.alertController.create({
      title: 'Atualizando produto',
      message: 'deseja atualizar produto permanentemente?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('operação cancelada');
            this.toast.create({ message: "O produto não foi modificado.", duration: 3000,
            position: 'bottom' }).present();
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('atualizando...');

            this.provider.putProduto(this.produto).subscribe((response) => {

              console.log(response);

              this.toast.create({ message: "atualizado com sucesso!", duration: 3000,
                position: 'bottom' }).present();

              this.navCtrl.setRoot(HomePage);
              
            });
          }
        }
      ]
    });
    
   confirm.present();

  }



}
