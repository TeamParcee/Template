import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
import { HelperService } from '../Services/helper.service';
import { Storage } from '@ionic/storage';
import { FirebaseService } from '../services/firebase.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CoachUidGuard implements CanLoad {

  constructor(
    private firebaseService: FirebaseService,
    private navCtrl: NavController,
    private helper: HelperService,
    private ls: Storage
  ) {
  }

  user;
  async canLoad(route: Route, segments: UrlSegment[]) {
    // this.user = await this.getUser();
    // return this.firebaseService.getUserData(this.user.uid).then(async (user: any) => {
    //   let coach = await this.firebaseService.getUserData(user.coachUid);
    //   console.log(coach);
    //   return false;
    //   // if (coach) {
    //   //   return true
    //   // } else {
    //   //   this.navCtrl.navigateForward("/select-coach");
    //   //   return false;
    //   // }
    // })
    return true;
  }


  getUser() {
    return new Promise((resolve) => {
      return firebase.auth().onAuthStateChanged((user) => {
        return resolve(user);

      })
    })
  }
}
