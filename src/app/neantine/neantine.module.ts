import { NgModule } from '@angular/core';

import { AuthenticationStore } from "../user/authentication-store";
import { UserStore } from "../user/user-store";
import { UrlSanitizerPipe } from "./url-sanitizer";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { MiniChoeursComponent } from "./minichoeurs/minichoeurs.component";
import { VoiceComponent } from "./voice/voice.component";
import { DevelopmentComponent } from "./development/development.component";
import {CommonModule} from "../common.module";

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    MiniChoeursComponent,
    VoiceComponent,
    DevelopmentComponent,
    UrlSanitizerPipe
  ],
  imports: [
    CommonModule.modules()
  ],
  providers: [
    UserStore.PROVIDERS,
    AuthenticationStore.PROVIDERS
  ]
})
export class NeantineModule {
}
