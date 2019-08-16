import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { HelperService } from 'src/app/Services/helper.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.page.html',
  styleUrls: ['./edit-plan.page.scss'],
})
export class EditPlanPage implements OnInit {

  constructor(
    private helper: HelperService,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
  ) { }

  id;
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getPlan()
  }
  getPlan(){
    this.route.params.subscribe((param)=>{
      console.log(param)
    })
  }
}
