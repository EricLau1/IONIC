import { Component } from '@angular/core';

// modificado manualmente
import { NavController, ToastController } from 'ionic-angular';

// adicionado manualmente
import { ContatoProvider } from '../../providers/contato/contato';
import { Observable } from '../../../node_modules/rxjs';
//import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // criado manualmente
  contatos: Observable<any>;

  // modificado manualmente
  constructor(public navCtrl: NavController, private provider: ContatoProvider,
    private toast : ToastController) {

      this.contatos = this.provider.getContatos();
  }

  // criado manualmente
  novoContato() {
    this.navCtrl.push("ContatoPage");
  }

  // criado manualmente
  editarContato(contato: any) {
    // Maneira 1
   // this.navCtrl.push("ContatoPage", { contato : contato });

    
     // maneira 2
      this.navCtrl.push("ContatoPage", { key : contato.key });
  }

  // criado manualmente
  removerContato(key : string) {

    if(confirm('Clique em Ok para remover.') == true) {

      this.provider.remover(key)
      .then(() => {
        this.toast.create({ message : "Contato removido com sucesso!", duration : 3000}).present();
      })
      .catch((e) => {
        this.toast.create({ message : "Erro ao remover o contato.", duration : 3000}).present();
        console.log(e);
      });

    }

  }

}
