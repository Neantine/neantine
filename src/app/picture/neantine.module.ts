import { NgModule } from '@angular/core';

import { AuthenticationStore } from "../user/authentication-store";
import { UserStore } from "../user/user-store";
import { UrlSanitizerPipe } from "./url-sanitizer";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import {CommonModule} from "../common.module";

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
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
export class PictureModule {
}
