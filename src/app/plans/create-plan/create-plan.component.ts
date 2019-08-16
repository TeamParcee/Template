import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/services/plan.service';
import { HelperService } from 'src/app/Services/helper.service';
import { AlertInput } from '@ionic/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as firebase from 'firebase';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

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
  user;

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
      plan.uid = this.firebaseService.user.uid;
      this.firebaseService.addDocument("/users/" + this.firebaseService.user.uid + "/plans", {...plan})
    })
  }

  getPlans() {
    firebase.firestore().collection("/users/" + this.firebaseService.user.uid + "/plans")
    .orderBy("date")
    .onSnapshot((planSnap) => {
      let plans = [];
      planSnap.forEach((plan) => {
        plans.push(plan.data())
      })
      this.plans = plans;
    })
  }

  selectPlan(plan){
    this.helper.closePopoverWithData(plan);
  }
}
