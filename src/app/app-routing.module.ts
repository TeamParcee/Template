import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CoachUidGuard } from './guards/coach-uid.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'home',  canLoad: [AuthGuard, CoachUidGuard], loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'create-account', loadChildren: './create-account/create-account.module#CreateAccountPageModule' },
  { path: 'tabs', canLoad: [AuthGuard, CoachUidGuard],  loadChildren: './tabs/tabs.module#TabsPageModule',},
  { path: 'plans',  canLoad: [AuthGuard, CoachUidGuard],  loadChildren: './plans/plans.module#PlansPageModule' },
  { path: 'drills',  canLoad: [AuthGuard, CoachUidGuard], loadChildren: './drills/drills.module#DrillsPageModule' },
  { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'select-coach', loadChildren: './select-coach/select-coach.module#SelectCoachPageModule' },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
