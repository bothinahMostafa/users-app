import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './users-list/user-list.component';


@NgModule({
  declarations: [ 
    UserComponent,
    UserListComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  providers: [],
})
export class UserModule { }
