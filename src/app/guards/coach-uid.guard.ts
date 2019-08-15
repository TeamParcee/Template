import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
import { HelperService } from '../Services/helper.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CoachUidGuard implements CanLoad {
  
  constructor(
    private navCtrl: NavController,
    private helper: HelperService,
    private ls: Storage
  ){}
  async canLoad(route: Route, segments: UrlSegment[])  {
    let coach = await this.ls.get('coach');

    if(coach){
      return true
    } else {
      this.navCtrl.navigateForward("/select-coach");
      return false;
    }
  }
}
