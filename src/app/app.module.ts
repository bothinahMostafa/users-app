import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ImageLazyLoadingDirective } from './helpers/directives/imageLazyLoading.direvtive';
import { FormsModule } from '@angular/forms';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImageLazyLoadingDirective
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    LazyLoadImageModule,
    FormsModule,
    VirtualScrollerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
