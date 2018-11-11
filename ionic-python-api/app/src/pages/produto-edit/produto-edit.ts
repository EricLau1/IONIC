import { Component } from '@angular/core';
//add Toast
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// add imports
import { ProdutoProvider } from '../../providers/produto/produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-produto-edit',
  templateUrl: 'produto-edit.html',
})
export class ProdutoEditPage {

  form: FormGroup;
  produto: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: ProdutoProvider, private formBuilder: FormBuilder,
    private toast: ToastController) {
  
      this.produto = this.navParams.data.produto;

      console.log(this.produto);
      
      this.validar();

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

      this.provider.putProduto(this.form.value)
      .subscribe((resposta) => {

        console.log(resposta);
        this.toast.create({ message: "Atualizado com sucesso!", duration: 3000, position: 'bottom' }).present();
        this.navCtrl.setRoot("ProdutoListPage");
        
      },
      error => {
        console.log(error);
        this.toast.create({ message: "Ooops! Failed. :'(", duration: 3000, position: 'bottom' }).present();
      });

    }
  }

  validar() {
    if(!this.produto.id){
      this.toast.create({ message: "Infelizmente ocorreu um erro! Por favor, tente mais tarde.", duration: 3000, position: 'bottom' }).present();
      this.navCtrl.setRoot("ProdutoListPage");
    }

  }





}
