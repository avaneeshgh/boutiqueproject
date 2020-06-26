import { OwnerService } from "./../../appservices/owner.service";
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private ownerService: OwnerService) {}
  ngOnInit() {
    this.ownerService.autoAuthOwner();
  }

  title = "SEB";
}
