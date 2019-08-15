import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CloseModalDirective } from './directives/close-modal.directive';
import { TestPage } from './test/test.page';
import { SharedModule } from './shared/shared.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase';
import { CreatePlanComponent } from './plans/create-plan/create-plan.component';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCeCR3SMe7pNbCCnOxEYfXa-LoO8fvAaRw",
    authDomain: "gfplanner-914.firebaseapp.com",
    databaseURL: "https://gfplanner-914.firebaseio.com",
    projectId: "gfplanner-914",
    storageBucket: "gfplanner-914.appspot.com",
    messagingSenderId: "985384525344",
    appId: "1:985384525344:web:dc4694a0260e492c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    TestPage,
    AppComponent, 
    CreatePlanComponent,
    CloseModalDirective],
  entryComponents: [
    TestPage,
    CreatePlanComponent,
  ],
  imports: [
    BrowserModule, 
    SharedModule,
    ReactiveFormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule],
  providers: [
    StatusBar,
    FormBuilder,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
