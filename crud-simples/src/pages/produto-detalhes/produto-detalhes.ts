import { Component } from '@angular/core';
// Toast e Alert adicionando manualmente
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

// adicionando manualmente
import { ProdutoProvider } from '../../providers/produto/produto';

@IonicPage()
@Component({
  selector: 'page-produto-detalhes',
  templateUrl: 'produto-detalhes.html',
})
export class ProdutoDetalhesPage {

  produto: any;
  date: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private provider: ProdutoProvider, private toast: ToastController,
    public alertCtrl: AlertController) {

    this.produto = this.navParams.data.produto || {};

    this.provider.getProduto(this.produto.id).subscribe( dados => {
      this.provider.selectedProduto = dados;
      this.produto = this.provider.selectedProduto;
      console.log(dados);
    });

    this.dateFormat();

  }

  // criado manualmente ~ data e hora
  dateFormat() {
    let dataAtual = new Date();
    this.date =  dataAtual.getHours() + "H " + 
                 this.getMes(dataAtual.getMonth()) + '/' + 
                 dataAtual.getFullYear();
  }

  getMes(mes: number) {
    let meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
    return meses[mes];
  }

  // criado manualmente ~ chama a pagina para atualização do produto
  editarProduto(produto: any) {
    this.navCtrl.push("ProdutoEditPage", { produto: produto });
  }

  // metodo simples para excluir o produto
  excluirProduto(produto: any) {
    
    this.provider.deleteProduto(produto.id).subscribe(
      resposta => {
        this.provider.produtoList = this.provider.produtoList.filter(p => p !== produto);
        console.log(resposta);
        this.toast.create( { message: 'Produto excluido com sucesso!.', duration : 3000}).present();
        this.navCtrl.setRoot("ProdutoListPage");
      },
      error => {
        console.log(error);
        this.toast.create( { message: 'Erro ao remover produto.', duration : 3000}).present();
      }
    );
    
  }

}
