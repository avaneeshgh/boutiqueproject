import { NotificationService } from "./notification.service";
import { OwnerService } from "./owner.service";
//just like services guarding routes not to allow users

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private ownerService: OwnerService,
    private router: Router,
    private notificationservice: NotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    if (!this.ownerService.getIsAuth()) {
      this.router.navigate(["/admin/login"]);
      this.notificationservice.success("Please Login to continue!");
    }

    return this.ownerService.getIsAuth();
  }
}
