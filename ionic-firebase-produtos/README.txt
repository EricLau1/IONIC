Ionic com Firebase

# ionic start ionic-firebase blank

# cd ionic-firebase

# npm i firebase@4.6.0 angularfire2@5.0.0-rc.3 --save

# ionic g provider produto

# ionic g page produto


Adicionar os modulos no AppModule:

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// adicionados manualmente
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ProdutoProvider } from '../providers/produto/produto';
 
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // adicionados manualmente
    AngularFireModule.initializeApp({

      /* código gerado da api do Firebase */

      apiKey: "SUA API KEY",
      authDomain: "SEU DOMAIN",
      databaseURL: "SUA URL",
      projectId: "SEU PROJECT ID",
      storageBucket: "SEU STORAGE",
      messagingSenderId: "SEU MSID"

    }),
    AngularFireDatabaseModule // adicionado manualmente
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProdutoProvider
  ]
})
export class AppModule {}


Modificar a pagina da home para chamar a pagina de produtos:

"home.ts":

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }


  addProduto() {
    this.navCtrl.push('ProdutoPage');
  }


}


"home.html":

<ion-header>
  <ion-navbar>
    <ion-title>
      Ionic Firebase
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <h1>crud usando a api do firebase</h1>

  <ion-fab bottom right>
    <button ion-fab color="primary" (click)="addProduto()">
      <ion-icon name="add"></ion-icon>
    </button>
  </ion-fab>
</ion-content>


Criar os métodos de comunicação com a api do firebase no ProdutoProvider:

import { Injectable } from '@angular/core';

// adicionado manualmente
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProdutoProvider {

  private PATH = "produtos/";

  constructor(private database: AngularFireDatabase) {

  }

  // método que retorna uma lista
  getProdutos() {

    return this.database.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(produto => ({
          key: produto.payload.key,
          ...produto.payload.val()
        }));
      });

  }


  // método que retorna um produto pela chave
  getProduto(key: string) {

    return this.database.object(this.PATH + key)
      .snapshotChanges()
      .map( produto => {
        return { key: produto.key, ...produto.payload.val() };
      });

  }


  save(produto: any) {

    return new Promise( (resolve, reject) => {

      if(produto.key) {

        // Atualiza o produto

        this.database.list(this.PATH)
          .update(produto.key, { descricao: produto.descricao, quantidade: produto.quantidade, valor: produto.valor } )
          .then( () => resolve() )
          .catch( (e) => reject(e) );
      
      } else {

        // Cria um novo produto

        this.database.list(this.PATH)
          .push( { descricao: produto.descricao, quantidade: produto.quantidade, valor: produto.valor } )
          .then( (result: any) => resolve(result.key) );

      }

    });

  }

  deleteProduto(key: string) {

    return this.database.list(this.PATH).remove(key);
      
  }

}


Criar a página que ficará responsável por inserir e editar um produto:

"produto.ts":

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



"produto.html":


<ion-header>

  <ion-navbar color="primary">
    <ion-title> {{ titulo }}</ion-title>
  </ion-navbar>

</ion-header>

<ion-content padding>

  <form [formGroup]="form">

    <ion-item>
      <ion-label stacked> Descrição </ion-label>
      <ion-input type="text" formControlName="descricao"></ion-input>
    </ion-item>

    <!-- Mensagem de validação para o campo da descrição -->
    <ion-item *ngIf="!form.controls.descricao.valid && (form.controls.descricao.dirty || form.controls.descricao.touched)" color="danger">
      <div [hidden]="!form.controls.descricao.errors.required">
        campo obrigatório!
      </div>
    </ion-item>

    <ion-item>
      <ion-label stacked> Quantidade </ion-label>
      <ion-input type="number" formControlName="quantidade"></ion-input>
    </ion-item>

    <!-- Mensagem de validação para o campo da quantidade -->
    <ion-item *ngIf="!form.controls.quantidade.valid && (form.controls.quantidade.dirty || form.controls.quantidade.touched)" color="danger">
      <div [hidden]="!form.controls.quantidade.errors.required">
        campo obrigatório!
      </div>
    </ion-item>

    <ion-item>
      <ion-label stacked> Valor </ion-label>
      <ion-input type="number" formControlName="valor"></ion-input>
    </ion-item>

    <!-- Mensagem de validação para o campo da descricação -->
    <ion-item *ngIf="!form.controls.valor.valid && (form.controls.valor.dirty || form.controls.valor.touched)" color="danger">
      <div [hidden]="!form.controls.valor.errors.required">
        campo obrigatório!
      </div>
    </ion-item>

    <div padding>
      <button ion-button block type="submit" [disabled]="!form.valid" (click)="onSubmit()"> gravar </button>
    </div>

  </form>

</ion-content>


Modificar a Home para listar os produtos, e adicionar os botão para exclusão e edição:

"home.ts":

import { Component } from '@angular/core';
// ToastController e AlertController adicionado manualmente
import { NavController, ToastController, AlertController } from 'ionic-angular';

// adicionados manualmente
import { ProdutoProvider } from '../../providers/produto/produto';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  produtos: Observable<any>;

  constructor(public navCtrl: NavController, private provider: ProdutoProvider,
    private toast: ToastController, private alertController: AlertController) {

      this.produtos = this.provider.getProdutos();
      console.log(this.produtos);

  }

  addProduto() {
    this.navCtrl.push('ProdutoPage');
  }

  editProduto(produto: any) {
    this.navCtrl.push('ProdutoPage', { produto: produto });
  }

  remove(key: string) {

    this.showConfirm(key);

  }

  showConfirm(key: string) {
    
    const confirm = this.alertController.create({
      title: 'Excluir produto',
      message: 'Deseja excluir os dados permanentemente?',
      buttons: [
        {
          text: 'cancelar',
          handler: () => {
            console.log('operação cancelada.');
            this.toast.create( { message: 'Os dados não foram apagados.', duration: 3000, 
              position: 'bottom' } ).present();
          }
        },
        {
          text: 'Ok',
          handler: () => {

            console.log('excluindo...');
            
            this.provider.deleteProduto(key)
              .then(() => {

                this.toast.create({ message: 'Os dados foram apagados com sucesso!', duration: 3000,
                position: 'bottom' }).present();

              })
              .catch((e) => {
               
                console.log(e);
                this.toast.create( { message: 'Erro ao apagar os dados.', duration: 3000, position: 'bottom' })
                  .present();

              });

          }
        }
      ]
    });

    confirm.present();

  }

}


"home.html":

<ion-header>
  <ion-navbar>
    <ion-title>
      Ionic Firebase
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>

  <ion-list>

    <ion-item-sliding *ngFor="let produto of produtos | async" >

      <ion-item>
        <h1>{{ produto.descricao }}</h1>
        <p>{{ produto.quantidade }} - {{ produto.valor }}</p>
      </ion-item>

      <ion-item-options>

        <button ion-button color="info" (click)="editProduto(produto)" >
          <ion-icon name="create"></ion-icon>
        </button>

        <button ion-button color="danger" (click)="remove(produto.key)">
          <ion-icon name="trash"></ion-icon>
        </button>

      </ion-item-options>

    </ion-item-sliding>
  </ion-list>


  <ion-fab bottom right>
    <button ion-fab color="primary" (click)="addProduto()">
      <ion-icon name="add"></ion-icon>
    </button>
  </ion-fab>
</ion-content>



END....

