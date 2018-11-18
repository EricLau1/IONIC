import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { CarroProvider } from '../../providers/carro/carro';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-carro-list',
  templateUrl: 'carro-list.html',
})
export class CarroListPage {

  carros : Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: CarroProvider, private toast: ToastController) {
  
      this.carros = this.provider.getCarros();

  }

  irParaCarro() {

    this.navCtrl.push("CarroPage");

  }

  editarCarro(carro : any) {
    this.navCtrl.push('CarroPage', { carro: carro } );
  }

  excluirCarro(key: string) {

    this.provider.deleteCarro(key)
      .then(() => {

        this.toast.create({message: 'Os dados foram apagados!', duration: 3000, position: 'bottom'}).present();

      })
      .catch((error) => {

        console.log(error);
        this.toast.create({message: "Erro ao apagar os dados.", duration: 3000, position: 'bottom'}).present();

      });

  }

}
