import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutBlankComponent } from './components/layout/layout-blank/layout-blank.component';
import { LayoutMainComponent } from './components/layout/layout-main/layout-main.component';
import { AuthGuard } from './auth/authGuard';
import { LoginComponent } from './components/login/login.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterUserComponent } from './components/user-management/register-user/register-user.component';


const routes: Routes = [
  /*{
    path:'login', component: LayoutBlankComponent,
    children: [
      { path: '', component: LoginComponent}, 
      { path: 'registeruser', component: RegisterUserComponent}
  },*/
  {
    path:'dashboard', component: LayoutMainComponent, 
    children: [
      { path: '', component: DashboardComponent}
    ]
  },
  {
    path:'', component: LayoutMainComponent,
    children: [
      { path: '', component: DashboardComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
