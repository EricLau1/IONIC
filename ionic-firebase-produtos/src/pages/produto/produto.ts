import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// adicionados manualemnte
import { ProdutoProvider } from '../../providers/produto/produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  titulo: string;
  form: FormGroup;
  produto: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: ProdutoProvider, private formBuilder: FormBuilder,
    private toast: ToastController) {

      this.produto = this.navParams.data.produto || {};
      
      this.createForm();

      this.setupPageTitle();
  }

  private setupPageTitle() {
    this.titulo = this.navParams.data.produto ? 'Editar produto': 'Novo produto';
  }

  createForm() {

    this.form = this.formBuilder.group({
      key: [this.produto.key],
      descricao: [this.produto.descricao, Validators.required],
      quantidade: [this.produto.quantidade, Validators.required],
      valor: [this.produto.valor, Validators.required]
    });

  }

  onSubmit() {

    if(this.form.valid) {

      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create( { message: "Produto salvo com sucesso!", duration: 3000, 
          position: 'top' }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create( { message: "Produto não foi salvo.", duration: 3000, position: 'top' }).present();
          console.error(e);
        });
    }
  }

}
