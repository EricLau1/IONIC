import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteListPage } from './cliente-list';

@NgModule({
  declarations: [
    ClienteListPage,
  ],
  imports: [
    IonicPageModule.forChild(ClienteListPage),
  ],
})
export class ClienteListPageModule {}
