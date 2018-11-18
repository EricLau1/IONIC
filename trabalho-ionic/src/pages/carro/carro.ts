import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { CarroProvider } from '../../providers/carro/carro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-carro',
  templateUrl: 'carro.html',
})
export class CarroPage {

  titulo: string;
  form: FormGroup;
  carro: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: CarroProvider, private formBuilder: FormBuilder,
    private toast: ToastController) {

      this.carro = this.navParams.data.carro || {};

      this.setTitle();

      this.criarForm();

  }

  private setTitle() {

    this.titulo = this.navParams.data.carro ? 'Editar carro' : 'Novo carro';

  }

  criarForm() {

    this.form = this.formBuilder.group({
      key: [this.carro.key],
      nome: [this.carro.nome, Validators.required],
      marca: [this.carro.marca, Validators.required],
      valor: [this.carro.valor, Validators.required]
    });

  }

  onSubmit() {

    if(this.form.valid) {

      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create( {"message": "Saved successfully!", duration: 3000, position: 'bottom'}).present();
          this.navCtrl.pop();
        })
        .catch((error) => {
          this.toast.create( {"message": "Failed save.", duration: 3000, position: 'bottom'}).present();
          console.log(error)
        });
    }

  }


}
