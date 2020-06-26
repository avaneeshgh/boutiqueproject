import { OwnerService } from "./../../../appservices/owner.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"],
})
export class MainNavComponent implements OnInit, OnDestroy {
  //variable to show specific icons on authentication
  isOwnerAuthenticated: boolean;

  //all items and subItems
  allItems = [
    { name: "Anarkali Suits", subItems: [] },
    { name: "Long Frocks", subItems: [] },
    { name: "Lehangas", subItems: [] },
    {
      name: "Salwar Kameez",
      subItems: [
        "Churidar Suits",
        "Pant Suits",
        "Patiyala Suits",
        "Straight Suits",
        "Palazzo Suits",
        "Sharara Suits",
      ],
    },
    { name: "Crop Tops", subItems: [] },
    {
      name: "Designer Blouses",
      subItems: [
        "Boat neck",
        "Halter neck",
        "High neck",
        "Stand collar",
        "Double collar",
      ],
    },
    { name: "Bridal Blouses", subItems: [] },
    { name: "Pattern Blouses", subItems: [] },
    { name: "Kids", subItems: [] },
    {
      name: "Inner Wear",
      subItems: [
        "Padded Bra",
        "Sport Bra",
        "Plane pantie",
        "Printed pantie",
        "Slips",
        "Full Slips",
        "Bloomer panties",
        "Cycling Shorts",
        "Nighty Slips",
        "Mother nighties",
      ],
    },
  ];

  //subscription to isUthenticated listener
  private isOwnerAuthsubs: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private ownerService: OwnerService
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit() {
    this.isOwnerAuthenticated = this.ownerService.getIsAuth();
    this.isOwnerAuthsubs = this.ownerService
      .getIsAuthenticatedListener()
      .subscribe((isOwnerAuthenticated) => {
        this.isOwnerAuthenticated = isOwnerAuthenticated;
      });
  }

  onLogOut() {
    this.ownerService.logout();
  }
  ngOnDestroy() {
    this.isOwnerAuthsubs.unsubscribe();
  }
}
