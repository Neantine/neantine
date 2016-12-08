import { NgModule } from '@angular/core';

import { AuthenticationStore } from "../user/authentication-store";
import { UserStore } from "../user/user-store";
import { PicturUrlSanitizerPipe } from "./picture-url-sanitizer";
import { HomeComponent } from "./picture-home/picture-home.component";
import { LoginComponent } from "./picture-login/picture-login.component";
import {PictureStore} from "./picture-store";
import {PictureUploaderComponent} from "./picture-uploader/picture-uploader.component";
import {PictureGalleryComponent} from "./picture-gallery/picture-gallery.component";
import {CommonModule} from "../common.module";

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    PictureUploaderComponent,
    PictureGalleryComponent,
    PicturUrlSanitizerPipe
  ],
  imports: [
    CommonModule.modules()
  ],
  providers: [
    PictureStore.PROVIDERS,
    UserStore.PROVIDERS,
    AuthenticationStore.PROVIDERS
  ]
})
export class PictureModule {
}
