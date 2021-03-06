import { ErrorComponent } from "./error/error/error.component";
import { MatDialog, MatDialogRef } from "@angular/material";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";

import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An Unknown Error Occured!";

        if (error.error.message) {
          errorMessage = error.error.message;
        }

        this.dialog.open(ErrorComponent, {
          data: { message: errorMessage },
          width: "300px",
          disableClose: false,
        });
        return throwError(error);
      })
    );
  }
}
