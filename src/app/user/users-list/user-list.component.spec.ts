import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UserService } from 'src/app/shared/services/users.service';
import { UserListComponent } from './user-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UserModel } from 'src/app/shared/models/user.model';
import * as FileSaver from 'file-saver';


const fakeUsersResp : UserModel[] = [{
  "age": 17,
  "email": "ellinor.landmark@example.com",
  "gender": "male",
  "id": 'https://randomuser.me/api/portraits/women/16.jpg',
  "location": {
    "street": '3155 Edvard Munchs vei', 
    "city": 'Langevåg'
  },
  "name": "Ms Ellinor Landmark",
  "phone": "32304615",
  "picture": {
    "large": 'https://randomuser.me/api/portraits/women/16.jpg', 
    "thumbnail": 'https://randomuser.me/api/portraits/thumb/women/16.jpg'
  },
  "seniority": "17 years ago"
},
{
  "age": 17,
  "email": "ellinor.landmark@example.com",
  "gender": "female",
  "id": 'https://randomuser.me/api/portraits/women/16.jpg',
  "location": {
    "street": '3155 Edvard Munchs vei', 
    "city": 'london'
  },
  "name": "Ms Ellinor london",
  "phone": "32304615",
  "picture": {
    "large": 'https://randomuser.me/api/portraits/women/16.jpg', 
    "thumbnail": 'https://randomuser.me/api/portraits/thumb/women/16.jpg'
  },
  "seniority": "17 years ago"
},
{
  "age": 17,
  "email": "ellinor.landmark@example.com",
  "gender": "female",
  "id": 'https://randomuser.me/api/portraits/women/16.jpg',
  "location": {
    "street": '3155 Edvard Munchs vei', 
    "city": 'USA'
  },
  "name": "Ms Ellinor USA",
  "phone": "32304615",
  "picture": {
    "large": 'https://randomuser.me/api/portraits/women/16.jpg', 
    "thumbnail": 'https://randomuser.me/api/portraits/thumb/women/16.jpg'
  },
  "seniority": "17 years ago"
}];



describe('UserListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserListComponent
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should init users list', fakeAsync(() => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    spyOn(userService, 'getUsersList').and.returnValue(of(fakeUsersResp));
    tick();
    app.ngOnInit()
    expect(app.usersList.length > 0).toBeTruthy();
  }));

  it('should set data to both users list and filtered list', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.componentInstance;
    app.getUsersList(fakeUsersResp);
    expect(app.usersList.length > 0).toBeTruthy();
    expect(app.filteredUsersList.length > 0).toBeTruthy();
  });

  it('should print error', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.componentInstance;
    spyOn(console, 'log').and.callFake(()=> {});
    fixture.detectChanges();
    app.handleUsersListError({});
    expect(console.log).toHaveBeenCalled();
  });

  it('should return same array if filter value empty', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.componentInstance;
    app.usersList = fakeUsersResp;
    fixture.detectChanges();
    app.filterUserByData({target: {value: ''}});
    expect(app.filteredUsersList.length).toEqual(3);
  });

  it('should return element only have same gender', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.componentInstance;
    app.usersList = fakeUsersResp;
    fixture.detectChanges();
    app.filterUserByData({target: {value: 'female', name: 'gender'}});
    expect(app.filteredUsersList.length).toEqual(2);
  });

  it('should return element only have same city', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.componentInstance;
    app.usersList = fakeUsersResp;
    fixture.detectChanges();
    app.filterUserByData({target: {value: 'london', name: 'city'}});
    expect(app.filteredUsersList.length).toEqual(1);
  });

  it('should call save as', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.componentInstance;
    app.usersList = fakeUsersResp;
    fixture.detectChanges();
    spyOn(FileSaver, 'saveAs').and.callFake(()=>{});
    fixture.detectChanges();
    app.exportListToCSV();
    expect(FileSaver.saveAs).toHaveBeenCalled();
  });

  it('should return object values joined by ,', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.componentInstance;
    const response = app.mapUserData(fakeUsersResp[0], Object.keys(fakeUsersResp[0]));
    const expectedOutput = `17,"ellinor.landmark@example.com","male","https://randomuser.me/api/portraits/women/16.jpg","3155 Edvard Munchs vei-Langevåg","Ms Ellinor Landmark","32304615","https://randomuser.me/api/portraits/women/16.jpg-https://randomuser.me/api/portraits/thumb/women/16.jpg","17 years ago"`;
    expect(response).toEqual(expectedOutput);
  });
});
