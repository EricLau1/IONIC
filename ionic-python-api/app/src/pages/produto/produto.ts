import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// add imports
import { ProdutoProvider } from '../../providers/produto/produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  form: FormGroup;
  produto: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private provider: ProdutoProvider, private formBuilder: FormBuilder,
    private toast: ToastController) {
  
      this.produto = this.navParams.data.produto || { };


      this.criarForm();

  }


  criarForm() {

    this.form = this.formBuilder.group({
      id : [this.produto.id],
      descricao: [this.produto.descricao, Validators.required],
      preco : [this.produto.preco, Validators.required],
      quantidade : [this.produto.quantidade, Validators.required]
    });

  }

  onSubmit() {

    if(this.form.valid) {

      this.provider.postProduto(this.form.value)
      .subscribe((resposta) => {

        console.log(resposta);
        this.toast.create({ message: "Salvo com sucesso!", duration: 3000, position: 'bottom' }).present();
        this.navCtrl.setRoot("ProdutoListPage");
        
      });
        
    }
  } // end onSubmit
}
