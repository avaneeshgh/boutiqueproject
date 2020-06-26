import { UserService } from "./../../../appservices/user.service";
import { User } from "./../../../models/user.model";
import { DialogService } from "./../../../appservices/dialog.service";
import { ProductService } from "./../../../appservices/product.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Product } from "models/product.model";
import { SafeMethodCall } from "@angular/compiler";

@Component({
  selector: "app-particular",
  templateUrl: "./particular.component.html",
  styleUrls: ["./particular.component.scss"],
})
export class ParticularComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productservice: ProductService,
    private dialogservice: DialogService,
    private userservice: UserService
  ) {}

  isLoading: boolean;

  currentProductId: string;
  currentProduct: Product;
  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap) => {
      this.currentProductId = paramMap.get("id");
    });

    this.productservice.getProduct(this.currentProductId).subscribe(
      (result) => {
        this.isLoading = false;
        this.currentProduct = result.product;
      },
      (err) => {
        this.isLoading = false;
      }
    );
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
              prodId: this.currentProductId,
              message: result.value.message,
            },
          };

          //spinner on
          this.isLoading = true;
          //calll post request on userservice
          this.userservice.postUser(userLikedDetails);
        }
      });
  }
}
