import { Component } from '@angular/core';
// add Toast
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// add manualmente
import { ClienteProvider } from '../../providers/cliente/cliente';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-cliente-list',
  templateUrl: 'cliente-list.html',
})
export class ClienteListPage {

  clientes : Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: ClienteProvider, private toast: ToastController) {
  
      this.clientes = this.provider.getClientes();

  }

  irParaCliente() {

    this.navCtrl.push("ClientePage");

  }

  editarCliente(cliente : any) {
    this.navCtrl.push('ClientePage', { cliente: cliente } );
  }

  excluirCliente(key: string) {

    this.provider.deleteCliente(key)
      .then(() => {

        this.toast.create({message: 'Os dados foram apagados!', duration: 3000, position: 'bottom'}).present();

      })
      .catch((error) => {

        console.log(error);
        this.toast.create({message: "Erro ao apagar os dados.", duration: 3000, position: 'bottom'}).present();

      });

  }

  

}
