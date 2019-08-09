import { Component } from '@angular/core';
import { HelperService } from '../Services/helper.service';
import { TestPage } from '../test/test.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private helper: HelperService,
  ) {}


  open(){
    this.helper.openModal(TestPage, null)
  }
}
