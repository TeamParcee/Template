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
  showStartTime = false;
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getPlans();
    this.getCurrentPlan();
  }
  getCurrentPlan(){
    firebase.firestore().doc("users/" + "" + "currentPlan/plan").onSnapshot((planSnap)=>{
      this.currentPlan = planSnap.data();
    })
  }
  showCreatePlan(event){
    this.helper.presentPopover(event, CreatePlanComponent).then((result:any)=>{
      let plan = result.data;
      this.firebaseService.setDocument("/currentPlan/plan", plan);
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
    })
  }

  timeChanged(event){
    this.showStartTime = false;
  }

  saveCurrentPlan(){
   
  }
}
