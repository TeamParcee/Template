import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/Services/helper.service';

@Component({
  selector: 'app-close-page-button',
  templateUrl: './close-page-button.component.html',
  styleUrls: ['./close-page-button.component.scss'],
})
export class ClosePageButtonComponent implements OnInit {

  constructor(
    private helper: HelperService,
  ) { }

  ngOnInit() {}

  close(){
    this.helper.closeModal();
  }
}
