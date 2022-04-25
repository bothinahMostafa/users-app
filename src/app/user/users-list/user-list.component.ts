import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { UserModel } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
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

  getUsersList(res) {
    this.usersList = res;
    this.filteredUsersList = this.usersList;
  }

  handleUsersListError(error) {
    console.log(error);
  }

  filterUserByData(event) {
    if(event.target.value === ""){
      this.filteredUsersList = this.usersList;
      return;
    }
    if('gender' === event.target.name) {
      this.filteredUsersList = this.usersList.filter(user => user.gender.toLowerCase() === event.target.value?.toLowerCase());
    }

    if('city' === event.target.name) {
      this.filteredUsersList = this.usersList.filter(user => user.location.city.toLowerCase() === event.target.value?.toLowerCase());
    }
   
  }

  exportListToCSV() {
    let users = [...this.usersList];
    let filedKeys = Object.keys(users[0]);
    filedKeys.splice(filedKeys.indexOf('id', 1));
    let csv = users.map(user => this.mapUserData(user, filedKeys));
    csv.unshift(filedKeys.join(','));
    let csvArray = csv.join('\r\n');
    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "usersListFile.csv");
  }

  mapUserData(user, filedKeys) {
    return this.mapFiledKeys(user, filedKeys);
  }

  mapFiledKeys(user, filedKeys) {
    const replacer = (key, value) =>
      value === null
        ? ''
        : value instanceof Object
        ? Object.values(value).join('-')
        : value;
    return filedKeys.map(filedKey =>  JSON.stringify(user[filedKey], replacer)).join(',');
  }
}
