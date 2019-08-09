import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClosePageButtonComponent } from './close-page-button/close-page-button.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ClosePageButtonComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  entryComponents :[],
  exports: [ClosePageButtonComponent]
})
export class SharedModule { }
