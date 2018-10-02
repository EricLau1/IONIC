import { Component } from '@angular/core';
// ToastController adicionado manualmente
import { NavController, ToastController } from 'ionic-angular';

// adicionado manualmente
import { ContatoProvider, ContatoList } from '../../providers/contato/contato';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contatos: ContatoList[];

  constructor(public navCtrl: NavController, private provider: ContatoProvider,
    private toast: ToastController) {

  }

  ionViewDidEnter() {

    this.provider.getAll()
      .then((dados) => {
        this.contatos = dados;
      });

  }

  addContato() {
    this.navCtrl.push('EditContatoPage');
  }

  editContato(item: ContatoList) {
    this.navCtrl.push('EditContatoPage', { chave: item.chave, contato: item });
  }

  removeContato(item: ContatoList) {

    this.provider.remove(item.chave)
      .then(() => {
        let index = this.contatos.indexOf(item);
        this.contatos.splice(index, 1);
        this.toast.create( { message: "Contato removido com sucesso!", 
          duration: 3000, position: 'bottom' }).present();
      });
  }
}
