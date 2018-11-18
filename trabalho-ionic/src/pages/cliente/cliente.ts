import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// add manualmente
import { ClienteProvider } from '../../providers/cliente/cliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  titulo: string;
  form: FormGroup;
  cliente: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: ClienteProvider, private formBuilder: FormBuilder,
    private toast: ToastController) {

      this.cliente = this.navParams.data.cliente || {};

      this.setTitle();

      this.criarForm();

  }

  private setTitle() {

    this.titulo = this.navParams.data.cliente ? 'Editar cliente' : 'Novo cliente';

  }

  criarForm() {

    this.form = this.formBuilder.group({
      key: [this.cliente.key],
      nome: [this.cliente.nome, Validators.required],
      email: [this.cliente.email, Validators.required],
      senha: [this.cliente.senha, Validators.required]
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
