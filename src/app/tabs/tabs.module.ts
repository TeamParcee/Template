import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule, ChildrenOutletContexts } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: "../home/home.module#HomePageModule"
      },{
        path: 'plans',
        loadChildren: "../plans/plans.module#PlansPageModule"
      },{
        path: 'drills',
        loadChildren: "../drills/drills.module#DrillsPageModule"
      },{
        path: '',
        redirectTo: 'home',
        pathMatch: "Full"
      }
    ]
  }
];

routes
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
