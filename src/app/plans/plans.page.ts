import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseService } from '../services/firebase.service';
import { HelperService } from '../Services/helper.service';
import { PlanService, Plan } from '../services/plan.service';
import { CreatePlanComponent } from './create-plan/create-plan.component';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private helper: HelperService,
    private planService: PlanService,
  ) { }

  plans = [];
  currentPlan;
  newPlan: Plan;
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getPlans();
  }
  getCurrentPlan(){

  }
  showCreatePlan(event){
    console.log(event);
    this.helper.presentPopover(event, CreatePlanComponent).then((result)=>{
      console.log()
    })
  }
  createPlan(){
    this.firebaseService.addDocument("plans", this.newPlan)
  }
  getPlans(){
    firebase.firestore().collection("plans").onSnapshot((planSnap)=>{
      let plans = [];
      planSnap.forEach((plan)=>{
        plans.push(plan.data())
      })
      this.plans = plans;
      console.log(this.plans, "plans")
    })
  }
}
