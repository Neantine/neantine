import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({name: 'urlSanitizer'})
export class UrlSanitizerPipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer ) {
  }

  transform( url: string ): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl( url );
  }

}
