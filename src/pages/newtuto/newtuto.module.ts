import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewtutoPage } from './newtuto';

@NgModule({
  declarations: [
    NewtutoPage,
  ],
  imports: [
    IonicPageModule.forChild(NewtutoPage),
  ],
})
export class NewtutoPageModule {}
