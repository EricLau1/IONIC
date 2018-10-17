import { Component } from '@angular/core';
// ToastController e AlertController adicionado manualmente
import { NavController, ToastController, AlertController } from 'ionic-angular';

// adicionados manualmente
import { ProdutoProvider } from '../../providers/produto/produto';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  produtos: Observable<any>;

  constructor(public navCtrl: NavController, private provider: ProdutoProvider,
    private toast: ToastController, private alertController: AlertController) {

      this.produtos = this.provider.getProdutos();
      console.log(this.produtos);

  }

  addProduto() {
    this.navCtrl.push('ProdutoPage');
  }

  editProduto(produto: any) {
    this.navCtrl.push('ProdutoPage', { produto: produto });
  }

  remove(key: string) {

    this.showConfirm(key);

  }

  showConfirm(key: string) {
    
    const confirm = this.alertController.create({
      title: 'Excluir produto',
      message: 'Deseja excluir os dados permanentemente?',
      buttons: [
        {
          text: 'cancelar',
          handler: () => {
            console.log('operação cancelada.');
            this.toast.create( { message: 'Os dados não foram apagados.', duration: 3000, 
              position: 'bottom' } ).present();
          }
        },
        {
          text: 'Ok',
          handler: () => {

            console.log('excluindo...');
            
            this.provider.deleteProduto(key)
              .then(() => {

                this.toast.create({ message: 'Os dados foram apagados com sucesso!', duration: 3000,
                position: 'bottom' }).present();

              })
              .catch((e) => {
               
                console.log(e);
                this.toast.create( { message: 'Erro ao apagar os dados.', duration: 3000, position: 'bottom' })
                  .present();

              });

          }
        }
      ]
    });

    confirm.present();

  }



}
