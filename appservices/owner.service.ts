import { NotificationService } from "./notification.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./../models/auth-data.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

const BACKEND_OWNER = environment.apiUrl + "/admin/login";

@Injectable({ providedIn: "root" })
export class OwnerService {
  //variable to store token got in authenticateOwner
  private token: string;

  //listener for authentication
  private isAuthenticated = new Subject<boolean>();

  //variable for isAuthenticated
  private isAuthenticatedvar = false;

  //timervariable for token
  private timerToken: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationservice: NotificationService
  ) {}

  //return observable
  getIsAuthenticatedListener() {
    return this.isAuthenticated.asObservable();
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticatedvar;
  }

  authenticateOwner(username: string, password: string) {
    //http call
    const authData: AuthData = { username: username, password: password };
    this.http
      .post<{ token: string; expiresIn: number }>(BACKEND_OWNER, authData)
      .subscribe(
        (result) => {
          //console.log(result);
          const token = result.token;
          this.token = token;

          if (token) {
            const expiresIn = result.expiresIn;
            this.setAuthTimer(expiresIn);
            //save token in localStorage to survive reloads
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresIn * 1000);
            this.saveAuthData(token, expirationDate);
            console.log(expirationDate);

            this.isAuthenticatedvar = true;
            //inform the app about authentication
            this.isAuthenticated.next(true);
            this.router.navigate(["/admin/update"]);
          }
        },
        (error) => {
          this.isAuthenticated.next(false);
        }
      );
  }

  //autoAuthonReload
  autoAuthOwner() {
    const authData = this.getAuthData();

    if (!authData) return;
    const now = new Date();
    const expiresIn = authData.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      //still in time
      this.token = authData.token; //same token
      this.isAuthenticatedvar = true; //var
      this.isAuthenticated.next(true); //notify
      this.setAuthTimer(expiresIn / 1000); //remaining time
    }
  }

  logout() {
    //null token
    this.token = null;
    //inform to app
    this.isAuthenticated.next(false);
    //var=false
    this.isAuthenticatedvar = false;

    //clear timeout for current session
    clearTimeout(this.timerToken);

    //clear local storage
    this.clearAuthData();

    //snackbar notification
    this.notificationservice.success("Logout Successful!");

    //navigate
    this.router.navigate(["/"]);
  }

  //local storage saving token
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) return;
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }

  //private variable timer
  private setAuthTimer(duration: number) {
    this.timerToken = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
