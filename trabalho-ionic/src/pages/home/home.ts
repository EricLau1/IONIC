import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  irParaClientes() {
    this.navCtrl.push("ClienteListPage");
  }

  irParaCarros() {
    this.navCtrl.push("CarroListPage");
  }

}
