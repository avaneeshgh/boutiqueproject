import { NotificationService } from "./../../../../appservices/notification.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { OwnerService } from "./../../../../appservices/owner.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.scss"],
})
export class AdminLoginComponent implements OnInit {
  constructor(
    public ownerservice: OwnerService,
    private router: Router,
    private notificationservice: NotificationService
  ) {}

  //subscription to isUthenticated listener
  private isOwnerAuthsubs: Subscription;

  //password hiding in html
  hide = true;

  isLoading: boolean;
  authStatusSub: Subscription;

  isAuth: boolean;

  ngOnInit() {
    this.isLoading = false;

    this.authStatusSub = this.ownerservice
      .getIsAuthenticatedListener()
      .subscribe((res) => {
        this.isLoading = false;
      });
  }

  onSubmit(logInForm: NgForm) {
    //spinner start
    this.isLoading = true;

    //take values from the form
    const username = logInForm.value.username;
    const password = logInForm.value.password;

    //calling owner-service authenticateUser method
    this.ownerservice.authenticateOwner(username, password);
    this.isOwnerAuthsubs = this.ownerservice
      .getIsAuthenticatedListener()
      .subscribe((result) => {
        if (result) {
          //snackbar notification
          this.notificationservice.success("Login Successful!");
        }
      });
  }
}
