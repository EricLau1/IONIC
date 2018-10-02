import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoCreatePage } from './produto-create';

@NgModule({
  declarations: [
    ProdutoCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoCreatePage),
  ],
})
export class ProdutoCreatePageModule {}
