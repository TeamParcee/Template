import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseService } from '../services/firebase.service';
import { HelperService } from '../Services/helper.service';
import { PlanService, Plan, Activity } from '../services/plan.service';
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
  activities;
  newPlan: Plan;
  showStartTime = false;
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getPlans();
    this.getCurrentPlan();
    this.getActivities();
  }
  getCurrentPlan() {
    firebase.firestore().doc("users/" + this.firebaseService.user.uid + "/currentPlan/plan").onSnapshot((planSnap) => {
      this.currentPlan = planSnap.data();
    })
  }
  showCreatePlan(event) {
    this.helper.presentPopover(event, CreatePlanComponent).then((result: any) => {
      let plan = result.data;
      this.firebaseService.setDocument("users/" + this.firebaseService.user.uid + "/currentPlan/plan", plan);
    })
  }
  createPlan() {
    this.firebaseService.addDocument("plans", this.newPlan)
  }
  getPlans() {
    firebase.firestore().collection("plans").onSnapshot((planSnap) => {
      let plans = [];
      planSnap.forEach((plan) => {
        plans.push(plan.data())
      })
      this.plans = plans;
    })
  }

  timeChanged(event, ) {
    this.showStartTime = false;
    this.saveCurrentPlan()
  }

  saveCurrentPlan() {
    this.firebaseService.setDocument("users/" + this.firebaseService.user.uid + "/currentPlan/plan", this.currentPlan);
    this.firebaseService.setDocument("users/" + this.firebaseService.user.uid + "/plans/" + this.currentPlan.id, this.currentPlan);
  }

  newActivity() {
    let activity: Activity = new Activity("", "New Activity", "", "");
    this.firebaseService.addDocument("users/" + this.firebaseService.user.uid + "/plans", activity);
  }
  getActivities() {
    firebase.firestore().collection("users/" + this.firebaseService.user.uid + "/plans").onSnapshot((snap) => {
      let activities = [];
      snap.forEach((activity) => {
        activities.push(activity.data())
      })
      this.activities = activities;
    })
  }
  
}
