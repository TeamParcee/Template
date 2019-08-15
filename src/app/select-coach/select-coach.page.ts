import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { HelperService } from '../Services/helper.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-select-coach',
  templateUrl: './select-coach.page.html',
  styleUrls: ['./select-coach.page.scss'],
})
export class SelectCoachPage implements OnInit {

  constructor(
    private helper: HelperService,
    private ls: Storage,
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
  }

  coaches;
  user;

  ionViewWillEnter() {
    this.getUser();
    this.getCoaches();
  }
  getCoaches() {
    firebase.firestore().collection("/users/").where("coach", "==", true)
      .onSnapshot((coachSnap) => {
        let coaches = [];
        coachSnap.forEach((coach) => {
          coaches.push(coach.data())
        })
        this.coaches = coaches;
      })
  }

  selectCoach(coach) {
    this.helper.confirmationAlert("Select Coach", "Are you sure you want to select " + coach.displayName + "as your coach?", { denyText: "Cancel", confirmText: "Select Coach" })
      .then((result) => {
        if (result) {
          this.firebaseService.setDocument("users/" + this.user.uid, {coachUid: coach.uid})
          this.navCtrl.navigateBack("/tabs/home");
        }
      })
  }

  logout(){
    this.helper.confirmationAlert("Log Out", "Are you sure you want to Log Out?", {denyText: "Cancel", confirmText: "Log Out"})
    .then((result)=>{
      if(result){
        firebase.auth().signOut().then(()=>{
          this.ls.remove('coach');
          this.navCtrl.navigateBack("/login");
        })
      }
    })
  }

  getUser(){
    firebase.auth().onAuthStateChanged((user)=>{
      this.user = user;
    })
  }
}
