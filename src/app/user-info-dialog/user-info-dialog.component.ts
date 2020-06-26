import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-user-info-dialog",
  templateUrl: "./user-info-dialog.component.html",
  styleUrls: ["./user-info-dialog.component.scss"],
})
export class UserInfoDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  ngOnInit() {}

  onCloseDialog() {
    this.dialogRef.close(null);
  }
}
