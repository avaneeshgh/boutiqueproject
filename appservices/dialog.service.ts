import { UserInfoDialogComponent } from "./../src/app/user-info-dialog/user-info-dialog.component";
import { ConfirmDialogComponent } from "./../src/app/confirm-dialog/confirm-dialog.component";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";

@Injectable({ providedIn: "root" })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(msg: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: "390px",
      panelClass: "confirm-dialog-container",
      disableClose: true,
      data: {
        message: msg,
      },
    });
  }

  openUserInfoDialog() {
    return this.dialog.open(UserInfoDialogComponent, {
      width: "650px",
      panelClass: "confirm-dialog-container",
      disableClose: true,
    });
  }
}
