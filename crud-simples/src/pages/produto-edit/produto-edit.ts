import { Component } from '@angular/core';
// Toast adicionado manualmente
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// adicionados manualmente
import { ProdutoProvider } from '../../providers/produto/produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-produto-edit',
  templateUrl: 'produto-edit.html',
})
export class ProdutoEditPage {

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
              
                  this.produto = this.provider.selectedProduto;
                  this.titulo = "Editar Produto";
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
    atualizar() {
  
      if(this.form.valid) {
        
        this.provider.putProduto(this.form.value).subscribe(
          resposta => {

            this.provider.selectedProduto = this.form.value;
            
            this.atualizarLista(this.form.value);

            this.toast.create( { message: 'Produto atualizado com sucesso!', duration : 3000}).present();
            console.log(resposta);

            this.navCtrl.setRoot("ProdutoListPage"); // retorna para a página indicada
          },
          error => {
            this.toast.create( { message: 'Erro ao atualizar produto.', duration : 3000}).present();
            console.error(error);
          });
          
        
      } else {
        console.log('Formulário inválido');
      }
     
    } // fim metodo

    // realiza a troca do produto atualizado na lista de produtos do provider 
    atualizarLista(produto: any) {

      for(let i = 0; i < this.provider.produtoList.length; i++) {

        if( this.provider.produtoList[i].id == produto.id ) {
          this.provider.produtoList[i] = produto;
        }

      } // end for
    } // end function

}
