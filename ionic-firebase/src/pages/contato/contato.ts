import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// adicionados manualmente
import { ContatoProvider } from '../../providers/contato/contato';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { subscribeOn } from '../../../node_modules/rxjs/operator/subscribeOn';

@IonicPage()
@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html',
})
export class ContatoPage {

  // criado manualmente
  titulo : string;
  form : FormGroup;
  contato : any;

  // modificaido manualmente
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: ContatoProvider,
    private toast : ToastController) {

      // maneira 1
      // this.contato = this.navParams.data.contato || {};
      // this.criarForm();

      // maneira 2

      this.contato = {};
      this.criarForm();

      if(this.navParams.data.key) {

        const subscribe = this.provider.getContato(this.navParams.data.key)
          .subscribe( (c: any) => {
            this.contato = c;
            this.criarForm();
          });
      }  

      this.setupPageTitle();
  }

  // criado manualmente
  private setupPageTitle() {
    this.titulo = this.navParams.data.contato ? 'Alterando contato' : 'Novo contato';
  }

  // criado manualmente
  criarForm() {
    this.form = this.formBuilder.group({
      key: [this.contato.key],
      nome : [this.contato.nome, Validators.required],
      tel : [this.contato.tel, Validators.required]
    })
  }

  // criado manualmente
  onSubmit() {

    if(this.form.valid) {
      this.provider.salvar(this.form.value)
        .then(() => {
          this.toast.create( { message: 'Contato salvo com sucesso!', duration : 3000}).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create( { message: 'Erro ao salvar contato.', duration : 3000}).present();
          console.error(e);
        });
    }

  }
}
