	CRUD IONIC

	comando inicial:

\> ionic start myCRUD blank

	criar a pagina para listar os produtos:

\> ionic g page produto-list

	criar a pagina para cadastro do produto:

\> ionic g page produto-create

	criar a pagina para ver detalhes do produto:

\> ionic g page produto-detalhes

	criar a página para editar o produto:

\> ionic g page produto-edit

	criar um provider para produtos:

\> ionic g provider produto

	acessar a pasta [app] e fazer o import do HttpClientModule no arquivo 'app.module.ts':

import { HttpClientModule } from '@angular/common/http';

	adicionar o HttpClientModule ao vetor de imports:

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule // adicionado manualmente
  ]


	acessar a pasta [providers] e fazer o método de comunicação com a Api-REST para pegar o vetor de produtos:

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProdutoProvider {

  // criado manualmente
  produtosURL = "http://localhost:3000/produtos";

  produtoList: Array<any>; // variavel que guarda a lista de produto
  selectedProduto: any;	// variavel que seleciona um produto especifico para fazer alterações

  constructor(public http: HttpClient) { }

  // criado manualmente ~ retorna uma lista de produtos
  getProdutos() {

    return this.http.get<Array<any>>(this.produtosURL);

  }

}



	acessar a pasta [produto-list] e o arquivo 'produto-list.ts':


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// adicionado manualmente
import { ProdutoProvider } from '../../providers/produto/produto';

@IonicPage()
@Component({
  selector: 'page-produto-list',
  templateUrl: 'produto-list.html',
})
export class ProdutoListPage {

  // criado manualmente
  produtos: Array<any>;

  // modificado manualmente
  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: ProdutoProvider) {

    this.provider.getProdutos().subscribe( dados => {
      this.provider.produtoList = dados;
      this.produtos = this.provider.produtoList;
    });

  } // fim construtor

  // criado manualmente
  novoProduto() {
    this.navCtrl.push("ProdutoCreatePage");
  }

}



	altere o HTML do arquivo 'produto-list.html':

<ion-header>

  <!-- color muda a cor do background -->
  <ion-navbar color="primary">
    <ion-title>Produtos</ion-title>
  </ion-navbar>

</ion-header>

<ion-content padding>

  <!-- componente para listas -->
  <ion-list>
    <ion-item *ngFor="let produto of produtos">
      <ion-avatar item-start>
        <ion-icon name="archive"></ion-icon>
      </ion-avatar>
      <h2> {{ produto.descricao }}</h2>
      <p> {{ produto.valor }} </p>
      <button ion-button clear item-end>Ver</button>
    </ion-item>
  </ion-list> <!-- fim lista de produtos -->

  <!-- botão para adicionar um novo produto -->
  <ion-fab bottom right>
    <button ion-fab color="primary" (click)="novoProduto()">
      <ion-icon name="add"></ion-icon>
    </button>
  </ion-fab>

</ion-content>


	acesse a pagina [home] e o arquivo 'home.ts' para criar a função que irá a chamar a página da lista de produtos:


import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) { }

  // método criando manualmente 
  listarProdutos() {
    this.navCtrl.push("ProdutoListPage");
  }

}


	altere o HTML do arquivo 'home.html':



<ion-header>
  <ion-navbar>
    <ion-title>
      Ionic CRUD
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>

  <p>
    Ionic 4, consumindo Rest Api feito em Go
  </p>

    <!-- Adicionado manualmente ~ botão para a pagina de produto -->
    <ion-fab bottom right>
      <button ion-fab color="primary" (click)="listarProdutos()">
        <ion-icon name="list"></ion-icon>
      </button>
    </ion-fab>

</ion-content>
	

	Acesse o provider de produtos e crie o método para resgatar o produto pelo Id e para criar um novo produto:


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProdutoProvider {

  // criado manualmente
  produtosURL = "http://localhost:3000/produtos";

  produtoList: Array<any>;
  selectedProduto: any;

  constructor(public http: HttpClient) { }

  // criado manualmente ~ retorna uma lista de produtos
  getProdutos() {

    return this.http.get<Array<any>>(this.produtosURL);

  }

  // criado manualmente ~ retorna um produto pelo id
  getProduto(id: number) {

    let url = this.produtosURL + '/' + id;

    return this.http.get<any>(url);

  }

  // criado manualmente ~ retona um numero inteiro randomico
  getId(): number {

    let num = Math.random() * 100;
    
    return parseInt( num + "" );
  
  }

  // criado manualmente ~ cria um novo produto
  postProduto(produto: any) {

    produto.id = this.getId();

    let dados = {
      "id" : produto.id,
      "descricao" : produto.descricao,
      "quantidade" : parseInt(produto.quantidade),
      "valor" : parseFloat(produto.valor)
    };

    return this.http.post(this.produtosURL, JSON.stringify(dados) );

  }

}

	Acesse a pagina [produto-create] e altere o arquivo 'produto-create.ts':


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

  // criado manualmente ~ criando e validando o form
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


	altere o HTML do arquivo 'produto-create.html':

<ion-header>

  <ion-navbar>
    <ion-title> {{ titulo }}</ion-title>
  </ion-navbar>

</ion-header>


<ion-content padding>

  <form [formGroup]="form">

    <!-- Campo para descrição do produto -->
    <ion-item>
        <ion-label stacked>Descrição</ion-label>
        <ion-input type="text" formControlName="descricao"></ion-input>
    </ion-item>
  
    <ion-item *ngIf="!form.controls.descricao.valid && (form.controls.descricao.dirty || form.controls.descricao.touched)" color="danger">
      <div [hidden]="!form.controls.descricao.errors.required">
        compo é obrigatório
      </div>
    </ion-item><!-- Fim Campo para descrição do produto -->

    <!-- Campo para Quantidade de produtos -->
    <ion-item>
        <ion-label stacked>Quantidade</ion-label>
        <ion-input type="number" formControlName="quantidade"></ion-input>
    </ion-item>
  
    <ion-item *ngIf="!form.controls.quantidade.valid && (form.controls.quantidade.dirty || form.controls.quantidade.touched)" color="danger">
      <div [hidden]="!form.controls.quantidade.errors.required">
        compo é obrigatório
      </div>
    </ion-item> <!-- Fim Campo para Quantidade de produtos -->
    
    <!-- Campo para Valor do produto -->
    <ion-item>
        <ion-label stacked>Valor</ion-label>
        <ion-input type="number" formControlName="valor"></ion-input>
    </ion-item>
  
    <ion-item *ngIf="!form.controls.valor.valid && (form.controls.valor.dirty || form.controls.valor.touched)" color="danger">
      <div [hidden]="!form.controls.valor.errors.required">
        compo é obrigatório
      </div>
    </ion-item> <!-- Fim Campo para Valor do produto -->

    <div padding>
      <button ion-button block type="submit" [disabled]="!form.valid"
        (click)="salvar()"> Salvar </button>
    </div>
  </form>

</ion-content>


	acesse a pagina [produto-list] e crie o metodo para chamar a página de detalhes:


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// adicionado manualmente
import { ProdutoProvider } from '../../providers/produto/produto';

@IonicPage()
@Component({
  selector: 'page-produto-list',
  templateUrl: 'produto-list.html',
})
export class ProdutoListPage {

  // criado manualmente
  produtos: Array<any>;

  // modificado manualmente
  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: ProdutoProvider) {

    this.provider.getProdutos().subscribe( dados => {
      this.provider.produtoList = dados;
      this.produtos = this.provider.produtoList;
    });

  } // fim construtor

  // criado manualmente
  novoProduto() {
    this.navCtrl.push("ProdutoCreatePage");
  }

  detalhesProduto(produto : any) {

    this.navCtrl.push("ProdutoDetalhesPage", { produto: produto } );

  }

}


	adicione o método ao HTML:

<ion-header>

  <!-- color muda a cor do background -->
  <ion-navbar color="primary">
    <ion-title>Produtos</ion-title>
  </ion-navbar>

</ion-header>

<ion-content padding>

  <!-- componente para listas -->
  <ion-list>
    <ion-item *ngFor="let produto of produtos">
      <ion-avatar item-start>
        <ion-icon name="archive"></ion-icon>
      </ion-avatar>
      <h2> {{ produto.descricao }}</h2>
      <p> {{ produto.valor }} </p>
      <button ion-button clear item-end (click)="detalhesProduto(produto)">Ver</button>
    </ion-item>
  </ion-list> <!-- fim lista de produtos -->

  <!-- botão para adicionar um novo produto -->
  <ion-fab bottom right>
    <button ion-fab color="primary" (click)="novoProduto()">
      <ion-icon name="add"></ion-icon>
    </button>
  </ion-fab>

</ion-content>


	acesse a pagina [produto-detalhes] e altere o arquivo 'produto-detalhes.ts':


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: ProdutoProvider) {

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

}





	Altere o HTML do arquivo 'produto-detalhes.html':



<ion-header>

  <ion-navbar color="primary">
    <ion-title> Detalhes </ion-title>
  </ion-navbar>

</ion-header>


<ion-content padding>

    <ion-card>
        <ion-item>
          <ion-avatar item-start>
              <ion-icon name="briefcase"></ion-icon>
          </ion-avatar>
          <h2> {{ produto.descricao }} # {{ produto.id }}</h2> 
          <p>registrado em...</p>
        </ion-item>
      
        <!-- <img src="img/imagem.jpg"> -->
      
        <ion-card-content>
          <p>Detalhes do produto...</p>
          <div><strong> Preço: </strong> {{ produto.valor }}</div>
          <div><strong> Qtde.: </strong> {{ produto.quantidade }} </div>
        </ion-card-content>
      
        <ion-row> <!-- inicia a linha -->

          <!-- 1ª Coluna -->
          <ion-col>
	    <!-- botão para editar -->
            <button ion-button icon-start clear small (click)="editarProduto(produto)">
              <ion-icon name="create"></ion-icon>
              <div> editar </div>
            </button>
          </ion-col> <!-- Fim 1ª Coluna -->

          <!-- 2ª Coluna -->
          <ion-col>
	    <!-- botão para excluir -->
            <button ion-button icon-start clear small>
              <ion-icon name="close"></ion-icon>
              <div> deletar </div>
            </button>
          </ion-col> <!-- Fim 2ª Coluna -->

          <!-- 3ª Coluna -->
          <ion-col>
            <ion-note ion-button icon-start clear small>
              <ion-icon name="calendar"></ion-icon>
              <div>{{ date }}</div>
            </ion-note>
          </ion-col> <!-- Fim 3ª Coluna -->

        </ion-row> <!-- final da linha -->
      
      </ion-card>
      
</ion-content>


	Acesse a pasta [providers] e o arquivo do ProdutoProvider e crie o método de atualização do produto:

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProdutoProvider {

  // criado manualmente
  produtosURL = "http://localhost:3000/produtos";

  produtoList: Array<any>;
  selectedProduto: any;

  constructor(public http: HttpClient) { }

  // criado manualmente ~ retorna uma lista de produtos
  getProdutos() {

    return this.http.get<Array<any>>(this.produtosURL);

  }

  // criado manualmente ~ retorna um produto pelo id
  getProduto(id: number) {

    let url = this.produtosURL + '/' + id;

    return this.http.get<any>(url);

  }

  // criado manualmente ~ retona um numero inteiro randomico
  getId(): number {

    let num = Math.random() * 100;
    
    return parseInt( num + "" );
  
  }

  // criado manualmente ~ cria um novo produto
  postProduto(produto: any) {

    produto.id = this.getId();

    let dados = {
      "id" : produto.id,
      "descricao" : produto.descricao,
      "quantidade" : parseInt(produto.quantidade),
      "valor" : parseFloat(produto.valor)
    };

    return this.http.post(this.produtosURL, JSON.stringify(dados) );

  }

  // criado manualmente método para atualização do produto
  putProduto(produto: any) {

    let url = this.produtosURL + '/update/' + produto.id;

    let dados = {
      "id" : parseInt(produto.id),
      "descricao" : produto.descricao,
      "quantidade" : parseInt(produto.quantidade),
      "valor" : parseFloat(produto.valor)
    };

    return this.http.post(url, JSON.stringify(dados) );
  }

}



	Acesse a página de [produto-edit] e o arquivo 'produto-edit.ts':


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


	altere o HTML do arquivo 'produto-edit.html':


<ion-header>

    <ion-navbar>
      <ion-title> {{ titulo }}</ion-title>
    </ion-navbar>
  
  </ion-header>
  
  
  <ion-content padding>
  
    <form [formGroup]="form">
  
      <!-- Campo para descrição do produto -->
      <ion-item>
          <ion-label stacked>Descrição</ion-label>
          <ion-input type="text" formControlName="descricao"></ion-input>
      </ion-item>
    
      <ion-item *ngIf="!form.controls.descricao.valid && (form.controls.descricao.dirty || form.controls.descricao.touched)" color="danger">
        <div [hidden]="!form.controls.descricao.errors.required">
          compo é obrigatório
        </div>
      </ion-item><!-- Fim Campo para descrição do produto -->
  
      <!-- Campo para Quantidade de produtos -->
      <ion-item>
          <ion-label stacked>Quantidade</ion-label>
          <ion-input type="number" formControlName="quantidade"></ion-input>
      </ion-item>
    
      <ion-item *ngIf="!form.controls.quantidade.valid && (form.controls.quantidade.dirty || form.controls.quantidade.touched)" color="danger">
        <div [hidden]="!form.controls.quantidade.errors.required">
          compo é obrigatório
        </div>
      </ion-item> <!-- Fim Campo para Quantidade de produtos -->
      
      <!-- Campo para Valor do produto -->
      <ion-item>
          <ion-label stacked>Valor</ion-label>
          <ion-input type="number" formControlName="valor"></ion-input>
      </ion-item>
    
      <ion-item *ngIf="!form.controls.valor.valid && (form.controls.valor.dirty || form.controls.valor.touched)" color="danger">
        <div [hidden]="!form.controls.valor.errors.required">
          compo é obrigatório
        </div>
      </ion-item> <!-- Fim Campo para Valor do produto -->
  
      <div padding>
        <button ion-button block type="submit" [disabled]="!form.valid"
          (click)="atualizar()"> Salvar </button>
      </div>
    </form>
  
  </ion-content>
  
  

	Volte ao arquivo do ProdutoProvider e crie um ultimo método para excluir produto pelo Id:

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProdutoProvider {

  // criado manualmente
  produtosURL = "http://localhost:3000/produtos";

  produtoList: Array<any>;
  selectedProduto: any;

  constructor(public http: HttpClient) { }

  // criado manualmente ~ retorna uma lista de produtos
  getProdutos() {

    return this.http.get<Array<any>>(this.produtosURL);

  }

  // criado manualmente ~ retorna um produto pelo id
  getProduto(id: number) {

    let url = this.produtosURL + '/' + id;

    return this.http.get<any>(url);

  }

  // criado manualmente ~ retona um numero inteiro randomico
  getId(): number {

    let num = Math.random() * 100;
    
    return parseInt( num + "" );
  
  }

  // criado manualmente ~ cria um novo produto
  postProduto(produto: any) {

    produto.id = this.getId();

    let dados = {
      "id" : produto.id,
      "descricao" : produto.descricao,
      "quantidade" : parseInt(produto.quantidade),
      "valor" : parseFloat(produto.valor)
    };

    return this.http.post(this.produtosURL, JSON.stringify(dados) );

  }

  // criado manualmente método para atualização do produto
  putProduto(produto: any) {

    let url = this.produtosURL + '/update/' + produto.id;

    let dados = {
      "id" : parseInt(produto.id),
      "descricao" : produto.descricao,
      "quantidade" : parseInt(produto.quantidade),
      "valor" : parseFloat(produto.valor)
    };

    return this.http.post(url, JSON.stringify(dados) );
  }

  // criado manualmente ~ método para excluir produto
  deleteProduto(id: number) {
    let url = this.produtosURL + '/delete/' + id;

    return this.http.get(url);
  }

}

	acessar a pagina [produto-detalhes] para adicionar o metodo para excluir produto:

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

	altere o HTML do arquivo 'produto-detalhes.html' para chamar o método:



<ion-header>

  <ion-navbar color="primary">
    <ion-title> Detalhes </ion-title>
  </ion-navbar>

</ion-header>


<ion-content padding>

    <ion-card>
        <ion-item>
          <ion-avatar item-start>
              <ion-icon name="briefcase"></ion-icon>
          </ion-avatar>
          <h2> {{ produto.descricao }} # {{ produto.id }}</h2> 
          <p>registrado em...</p>
        </ion-item>
      
        <!-- <img src="img/imagem.jpg"> -->
      
        <ion-card-content>
          <p>Detalhes do produto...</p>
          <div><strong> Preço: </strong> {{ produto.valor }}</div>
          <div><strong> Qtde.: </strong> {{ produto.quantidade }} </div>
        </ion-card-content>
      
        <ion-row> <!-- inicia a linha -->

          <!-- 1ª Coluna -->
          <ion-col>
	    <!-- botão para editar -->
            <button ion-button icon-start clear small (click)="editarProduto(produto)">
              <ion-icon name="create"></ion-icon>
              <div> editar </div>
            </button>
          </ion-col> <!-- Fim 1ª Coluna -->

          <!-- 2ª Coluna -->
          <ion-col>
	    <!-- botão para excluir -->
            <button ion-button icon-start clear small (click)="excluirProduto(produto)">
              <ion-icon name="close"></ion-icon>
              <div> deletar </div>
            </button>
          </ion-col> <!-- Fim 2ª Coluna -->

          <!-- 3ª Coluna -->
          <ion-col>
            <ion-note ion-button icon-start clear small>
              <ion-icon name="calendar"></ion-icon>
              <div>{{ date }}</div>
            </ion-note>
          </ion-col> <!-- Fim 3ª Coluna -->

        </ion-row> <!-- final da linha -->
      
      </ion-card>
      
</ion-content>



	comandos para executar o aplicativo:

	\> ionic serve

	\> ionic serve -l


	FIM!


	













