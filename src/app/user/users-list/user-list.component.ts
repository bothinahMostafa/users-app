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

  /**
   * constructor
   * @param userService 
   */
  constructor(private userService: UserService) {
  }

  /**
   * on init function
   */
  ngOnInit(): void {
    this.userService.getUsersList().subscribe({
      next: this.getUsersList.bind(this),
      error: this.handleUsersListError.bind(this),
    });
  }

  /**
   * set users list when data is retrieved
   * @param res 
   */
  getUsersList(res) {
    this.usersList = res;
    this.filteredUsersList = this.usersList;
  }

  /**
   * handle http request error
   * @param error 
   */
  handleUsersListError(error) {
    console.log(error);
  }

  /**
   * filter users by gender or city and skip if search value is empty string
   * @param event 
   * @returns 
   */
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

  /**
   * export users list to csv
   */
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

  /**
   * map user data to a format that could be converted to csv 
   * @param user 
   * @param filedKeys 
   * @returns string
   */
  mapUserData(user, filedKeys): string {
    const replacer = (key, value) =>
      value === null
        ? ''
        : value instanceof Object
        ? Object.values(value).join('-')
        : value;

       return filedKeys.map(filedKey =>  JSON.stringify(user[filedKey], replacer)).join(',');
  }
}
