import { DialogService } from "./../../../../appservices/dialog.service";
import { Product } from "./../../../../models/product.model";
import { ProductService } from "./../../../../appservices/product.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-admin-edit-product",
  templateUrl: "./admin-edit-product.component.html",
  styleUrls: ["./admin-edit-product.component.scss"],
})
export class AdminEditProductComponent implements OnInit {
  //all items and subItems

  salwars: string[] = [
    "Churidar Suit",
    "Pant Suit",
    "Patiyala Suit",
    "Straight Suit",
    "Palazzo Suit",
    "Sharara Suit",
  ];

  desbl: string[] = [
    "Boat Neck",
    "Halter Neck",
    "High Neck",
    "Stand Collar",
    "Double Collar",
  ];

  inner: string[] = [
    "Padded Bra",
    "Sport Bra",
    "Plane Pantie",
    "Printed Pantie",
    "Slip",
    "Full Slip",
    "Bloomer Pantie",
    "Cycling Short",
    "Nighty Slip",
    "Mother Nightie",
  ];

  private currentProductId: string;
  currentProduct: Product;
  constructor(
    private productservice: ProductService,
    public route: ActivatedRoute,
    private dialogservice: DialogService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      //get id from the routerlink
      this.currentProductId = paramMap.get("id");

      //get product from the database

      this.productservice
        .getProduct(this.currentProductId)
        .subscribe((result) => {
          this.currentProduct = {
            id: result.product._id,
            productname: result.product.productname,
            producttype: result.product.producttype,
            imgurl: result.product.imgurl,
            price: result.product.price,
            description: result.product.description,
          };
        });
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    const producttobeupdated: Product = {
      id: this.currentProductId,
      productname: form.value.productname,
      producttype: form.value.producttype,
      imgurl: form.value.imgurl,
      price: form.value.price,
      description: form.value.description,
    };

    this.dialogservice
      .openConfirmDialog("Save Changes?")
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          //call upadateproduct in productservice
          this.productservice.updateProduct(producttobeupdated);
        }
      });
  }
}
