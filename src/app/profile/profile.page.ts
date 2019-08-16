import { Component, OnInit } from '@angular/core';
import { HelperService } from '../Services/helper.service';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private helper: HelperService,
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private ls: Storage,

  ) { }

  user;
  coach;
  
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getUser();
  }
  ionViewDidEnter() {
    this.getUserData();
  }
  logout() {
    this.helper.confirmationAlert("Log Out", "Are you sure you want to Log Out?", { denyText: "Cancel", confirmText: "Log Out" })
      .then((result) => {
        if (result) {
          firebase.auth().signOut().then(() => {
            this.ls.remove('coach');
            this.navCtrl.navigateBack("/login")

          })
        }
      })
  }

  getUserData() {
    firebase.firestore().doc('users/' + this.user.uid).onSnapshot((userSnap) => {
      this.user = userSnap.data();
      this.getCoachData();
    })
  }

  getCoachData(){
    firebase.firestore().doc('users/' + this.user.coachUid).onSnapshot((userSnap) => {
      this.coach = userSnap.data();
    })
  }
  getUser() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
    })
  }

}
