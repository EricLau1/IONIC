import { Component } from '@angular/core';
// Toast add,
import { NavController, ToastController } from 'ionic-angular';

// add manualmente
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  form: FormGroup;
  user: any;

  constructor(public navCtrl: NavController, private provider: UsuarioProvider,
    private toast: ToastController, private formBuilder: FormBuilder) { 

      this.user = {
        "nome" : "",
        "senha": ""
      };

      this.criarForm();

    }

    criarForm() {

      this.form = this.formBuilder.group({
        nome : [this.user.nome,  Validators.required],
        senha: [this.user.senha, Validators.required]
      });

    }

    signin() {

      if(this.form.valid) {

        this.provider.login(this.form.value)
          .subscribe((resposta) => {
            
            let data = resposta;
            console.log(data);

            if(!data['message']) {

              this.toast.create({ message: "logado com sucesso!", duration: 3000, position: 'bottom'}).present();
              this.irParaProdutos();

            } else {

              this.toast.create({ message: data['message'], duration: 3000, position: 'bottom'}).present();

            }

          });

      }

    }

    signup() {

      if(this.form.valid) {

        this.provider.cadastrar(this.form.value)
        .subscribe((resposta) => {
          
          let data = resposta;
          console.log(data);

          if(data['message'] === "OK") {

            this.toast.create({ message: "cadastrado com sucesso!", duration: 3000, position: 'bottom'}).present();
          
          } else {

            this.toast.create({ message: data['message'], duration: 3000, position: 'bottom'}).present();

          }

        });

      }

    }


    irParaProdutos() {

      this.navCtrl.setRoot("ProdutoListPage");

    }

  

}
