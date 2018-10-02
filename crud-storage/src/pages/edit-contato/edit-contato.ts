import { Component } from '@angular/core';

// ToastController adicionado manualmente
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// adicionado manualmentes
import { ContatoProvider, Contato} from '../../providers/contato/contato';

@IonicPage()
@Component({
  selector: 'page-edit-contato',
  templateUrl: 'edit-contato.html',
})
export class EditContatoPage {

  model: Contato;
  chave: string;
  titulo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: ContatoProvider, private toast: ToastController) {
  
      if (this.navParams.data.chave && this.navParams.data.contato) {

        this.titulo = "Editar contato";
        this.model = this.navParams.data.contato;
        this.chave = this.navParams.data.chave;

      } else {

        this.titulo = "Novo Contato";
        this.model = new Contato();

      }

  }

  saveContato() {

    if(this.chave) {

      this.provider.update(this.chave, this.model)
        .then(() => {
          this.toast.create( { message: "Contato atualizado com sucesso!", 
          duration: 3000, position: 'bottom' } ).present();
          this.navCtrl.pop();
        })
        .catch((erro) => {

          this.toast.create( { message: "Contato não foi atualizado.", 
          duration: 3000, position: 'bottom' } ).present();
          this.navCtrl.pop();
        });

    } else {

      this.provider.insert(this.model)
        .then(() => {
          this.toast.create( { message: "Contato adicionado com sucesso!", 
          duration: 3000, position: 'bottom' } ).present();
          this.navCtrl.pop();
        })
        .catch((erro) => {
          this.toast.create( { message: "Contato não foi adicionado.", 
          duration: 3000, position: 'bottom' } ).present();
          this.navCtrl.pop();
        });

    }

  }

  showToast( msg: string, time: number, lado: string ){

    this.toast.create( { message: msg, duration: time, position: lado } ).present();

  }

}
