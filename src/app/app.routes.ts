import { Routes } from '@angular/router';


import { HomeComponent }  from  "./picture/home/home.component";
import { LoginComponent } from  "./picture/login/login.component";


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'index', component: HomeComponent },
  { path: 'login', component: LoginComponent },
];
