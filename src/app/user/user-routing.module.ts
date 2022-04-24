import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './users-list/user-list.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserComponent,
    redirectTo: 'users-list',
    children: [
      {
        path: 'users-list',
        component: UserListComponent
      }
    ]
  }
];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
