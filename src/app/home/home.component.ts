import { Component, OnInit } from '@angular/core';
import { UserModel } from '../helpers/models/user.model';
import { UserService } from '../helpers/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  filteredUsersList: UserModel[];
  usersList: UserModel[];
  isImagesUpdated: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsersList().subscribe({
      next: this.getUsersList.bind(this),
      error: this.handleUsersListError.bind(this),
    });
  }

  updateImage(event) {
    console.log(event);
  }

  getUsersList(res) {
    this.usersList = res;
    this.filteredUsersList = this.usersList;
  }

  handleUsersListError(error) {

  }

  filterUsersList() {
    this.filteredUsersList = this.usersList;
  }
}
