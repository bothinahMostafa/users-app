import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { map } from "rxjs/operators";
import { UserModel } from "../models/user.model";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    getUsersList() : Observable<any> {
        return this.http.get("https://randomuser.me/api/")
        .pipe(
        map((data: any)=> {
            const users = data.results;
            if(!(users.length > 0)) {
                return of(null);
            }
            return users.map(user => {
                let {gender, name: {title, first, last} , location: {street, city}, email, registered: {date, age}, phone, picture: {large, thumbnail}} = user;

                return {
                    name: `${title} ${first} ${last}`,
                    gender,
                    location: { street: `${street.number} ${street.name}`, city},
                    email,
                    seniority: this.calculateSeniority(date),
                    phone,
                    age,
                    picture : {large, thumbnail},
                    id: {large}
                };
            });
        })); 
    }
    private calculateSeniority(date) {
      return moment(date).fromNow();
    }

}