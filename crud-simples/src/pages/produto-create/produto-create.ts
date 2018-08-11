import { Component } from '@angular/core';
// Toast adicionado manualmente
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// adicionados manualmente
import { ProdutoProvider } from '../../providers/produto/produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-produto-create',
  templateUrl: 'produto-create.html',
})
export class ProdutoCreatePage {

    // criado manualmente
    titulo : string;
    form : FormGroup;
    produto : any;

    // parametros adicionados manualmente
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder: FormBuilder, 
              private provider: ProdutoProvider,
              private toast : ToastController
            ) { 
            
                this.produto = {
                  id : null,
                  descricao : '',
                  quantidade : null,
                  valor : null
                 };
                this.titulo = "Novo Produto";
                this.criarForm();

            }

  // criado manualmente
  criarForm() {
    this.form = this.formBuilder.group({
      id : [this.produto.id],
      descricao : [this.produto.descricao, Validators.required],
      quantidade : [this.produto.quantidade, Validators.required],
      valor : [this.produto.valor, Validators.required]
    })
  }


  // criado manualmente
  salvar() {

    if(this.form.valid) {

      // console.log(this.form.value);
      
      this.provider.postProduto(this.form.value).subscribe(
        resposta => {
          this.provider.produtoList.push(this.form.value); // adiciona o novo produto ao vetor de produtos
          this.toast.create( { message: 'Produto salvo com sucesso!', duration : 3000}).present();
         // console.log(resposta);
          this.navCtrl.pop(); // retorna a página anterior
        },
        error => {
          this.toast.create( { message: 'Erro ao salvar produto.', duration : 3000}).present();
          console.error(error);
        });
      
    } else {
      console.log('Formulário inválido');
    }
   
  } // fim metodo

}
