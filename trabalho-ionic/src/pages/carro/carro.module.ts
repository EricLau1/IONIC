import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarroPage } from './carro';

@NgModule({
  declarations: [
    CarroPage,
  ],
  imports: [
    IonicPageModule.forChild(CarroPage),
  ],
})
export class CarroPageModule {}
