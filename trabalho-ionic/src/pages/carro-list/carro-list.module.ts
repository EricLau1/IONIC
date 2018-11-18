import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarroListPage } from './carro-list';

@NgModule({
  declarations: [
    CarroListPage,
  ],
  imports: [
    IonicPageModule.forChild(CarroListPage),
  ],
})
export class CarroListPageModule {}
