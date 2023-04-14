import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeStyle, SafeUrl } from '@angular/platform-browser';
@Pipe({
  name: 'CustomSafePipe'
})
export class SafePipe implements PipeTransform {

  constructor (private sanitizer : DomSanitizer) {}
  public transform(value:any , type:string): SafeHtml | SafeStyle | SafeUrl | SafeResourceUrl {
    switch(type){
      case 'html' : return this.sanitizer.bypassSecurityTrustHtml(value)
      case 'style' : return this.sanitizer.bypassSecurityTrustStyle(value)
      case 'url' : return this.sanitizer.bypassSecurityTrustUrl(value)
      case 'resourceUrl' : return this.sanitizer.bypassSecurityTrustResourceUrl(value)
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
