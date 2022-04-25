import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './users-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ 
    UserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    LazyLoadImageModule,
    FormsModule,
    VirtualScrollerModule
  ],
  providers: [],
})
export class UserModule { }
