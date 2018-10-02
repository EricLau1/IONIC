import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditContatoPage } from './edit-contato';

@NgModule({
  declarations: [
    EditContatoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditContatoPage),
  ],
})
export class EditContatoPageModule {}
