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

@NgModule({
  declarations: [
    TestPage,
    AppComponent, 
    CloseModalDirective],
  entryComponents: [
    TestPage
  ],
  imports: [
    BrowserModule, 
    SharedModule,
    IonicModule.forRoot(), 
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
