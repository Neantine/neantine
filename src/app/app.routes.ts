import { Routes } from '@angular/router';


import { HomeComponent }  from  "./neantine/home/home.component";
import { LoginComponent } from  "./neantine/login/login.component";
import { MiniChoeursComponent } from  "./neantine/minichoeurs/minichoeurs.component";
import { VoiceComponent } from  "./neantine/voice/voice.component";
import { DevelopmentComponent } from  "./neantine/development/development.component";

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'index', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dev', component: DevelopmentComponent },
  { path: 'minichoeurs', component: MiniChoeursComponent },
  { path: 'voice', component: VoiceComponent },
];
