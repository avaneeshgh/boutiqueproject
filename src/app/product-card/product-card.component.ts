import { UserService } from "./../../../appservices/user.service";
import { OwnerService } from "./../../../appservices/owner.service";
import { NotificationService } from "./../../../appservices/notification.service";
import { DialogService } from "./../../../appservices/dialog.service";
import { ProductService } from "./../../../appservices/product.service";
import { Product } from "./../../../models/product.model";
import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "models/user.model";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent implements OnInit {
  @Input() p: Product;

  isLoading: boolean;

  isAuthenticated: boolean;
  constructor(
    public router: Router,
    private productservice: ProductService,
    private dialogService: DialogService,
    private ownerservice: OwnerService,
    private notificationservice: NotificationService,
    private userservice: UserService,
    private dialogservice: DialogService
  ) {}

  ngOnInit() {
    //get isAuthenticated from owner service
    this.isAuthenticated = this.ownerservice.getIsAuth();

    //listen to any changes
    this.ownerservice.getIsAuthenticatedListener().subscribe((result) => {
      this.isAuthenticated = result;
    });
  }

  onLiked() {
    this.dialogservice
      .openUserInfoDialog()
      .afterClosed()
      .subscribe((result) => {
        if (result == null) {
        } else {
          const userLikedDetails: User = {
            id: null,
            userName: result.value.userName,
            userEmail: result.value.userEmail,
            userPhone: result.value.userPhone,
            userCity: result.value.userCity,
            userGender: result.value.userGender,
            userLikedProducts: {
              prodId: this.p.id,
              message: result.value.message,
            },
          };

          //calll post request on userservice
          this.userservice.postUser(userLikedDetails);
        }
      });
  }

  onDelete(id) {
    this.dialogService
      .openConfirmDialog("Are you sure you want to delete this product?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          //spinner on
          this.isLoading = true;
          //call on deleteProduct in productservice

          this.productservice.deleteProduct(id).subscribe(
            (res) => {
              //call getproducts to modify UI
              // this.productservice.getProducts();

              //spinner off
              this.isLoading = false;

              //snackbar notification
              this.notificationservice.success("Product Delete Successful!");
              //routing to services again
              this.router.navigate(["/collections"]);
            },
            (err) => {
              this.isLoading = false;
            }
          );
        }
      });
  }

  viewParticular() {
    this.router.navigate([
      "/collections/" + this.p.producttype + "/" + this.p.id,
    ]);
  }
}
