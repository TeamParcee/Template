import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private navCtrl: NavController,
  ){}
  async canLoad(route: Route, segments: UrlSegment[])  {
    return (await this.getUser()) ? true : false;
  }

  getUser() {
    return new Promise((resolve) => {
      return firebase.auth().onAuthStateChanged((user) => {
        return resolve((user) ? true : this.navCtrl.navigateRoot("/login"));
      })
    })
  }
}
