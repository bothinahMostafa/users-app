import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appImageLazyLoading]'
})
export class ImageLazyLoadingDirective {
    constructor(private el: ElementRef) {
        let imageEl= (<HTMLImageElement>this.el.nativeElement);
        imageEl.addEventListener('load', function() {
            imageEl.setAttribute('src', imageEl.getAttribute('id'));
        });        
    }
}