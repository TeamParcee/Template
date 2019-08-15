import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/services/plan.service';
import { HelperService } from 'src/app/Services/helper.service';
import { AlertInput } from '@ionic/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss'],
})
export class CreatePlanComponent implements OnInit {

  constructor(
    private helper: HelperService,
    private firebaseService: FirebaseService,

  ) { }

  ngOnInit(

  ) { }

  plan: Plan;
  plans: Plan[];

  ionViewWillEnter(){
    this.getPlans()
  }
  newPlan() {
    let options: AlertInput = {
      type: "date",
      name: "name",

    }
    this.helper.inputAlert("New Plan", "Enter the date of the new Practice Plan", [options]).then((result) => {
      let plan = new Plan("", result.toString(), "");
      this.firebaseService.addDocument("plans", plan)
    })
  }

  getPlans() {
    firebase.firestore().collection("plans")
    .orderBy("date")
    .onSnapshot((planSnap) => {
      let plans = [];
      planSnap.forEach((plan) => {
        plans.push(plan.data())
      })
      this.plans = plans;
    })
  }

  selectPlan(){
    
  }
}
