import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageLazyLoadingDirective } from './directives/imageLazyLoading.direvtive';

const directiveArr = [ ImageLazyLoadingDirective ];
@NgModule({
  declarations: [
    ...directiveArr
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ...directiveArr
  ]
})
export class SharedModule { }
