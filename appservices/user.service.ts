import { environment } from "./../src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NotificationService } from "./notification.service";
import { User } from "./../models/user.model";

const BACKEND_USER = environment.apiUrl + "/users";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(
    private http: HttpClient,
    public router: Router,
    private notificationservice: NotificationService
  ) {}

  postUser(userLikedDetails: User) {
    //post request
    this.http
      .post<{ message: string }>(BACKEND_USER, userLikedDetails)
      .subscribe((result) => {
        console.log(result.message);
        this.notificationservice.success(
          "We recieved your Interest.Thank You!"
        );

        //temporarily navigate to collections
        this.router.navigate(["/collections"]);
      });
  }
}
