import { Router } from "@angular/router";
import { ProductService } from "./../../../../appservices/product.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-update",
  templateUrl: "./admin-update.component.html",
  styleUrls: ["./admin-update.component.scss"],
})
export class AdminUpdateComponent implements OnInit {
  //all items and subItems

  salwars: string[] = [
    "Churidar+Suit",
    "Pant+Suit",
    "Patiyala+Suit",
    "Straight+Suit",
    "Palazzo+Suit",
    "Sharara+Suit",
  ];

  desbl: string[] = [
    "Boat+Neck",
    "Halter+Neck",
    "High+Neck",
    "Stand+Collar",
    "Double+Collar",
  ];

  inner: string[] = [
    "Padded+Bra",
    "Sport+Bra",
    "Plane+Pantie",
    "Printed+Pantie",
    "Slip",
    "Full+Slip",
    "Bloomer+Pantie",
    "Cycling+Short",
    "Nighty+Slip",
    "Mother+Nightie",
  ];

  constructor(public productservice: ProductService, public router: Router) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    //form invalid
    if (form.invalid) {
      return;
    }
    //create an obj

    const product = {
      productname: form.value.productname,
      producttype: form.value.producttype,
      imgurl: form.value.imgurl,
      price: form.value.price,
      description: form.value.description,
    };

    //console.log(product);
    //first post the product - it sets either true or false
    this.productservice.postProduct(product);
    //form resetting
    form.onReset();

    //go to services
    this.router.navigate(["/services"]);
  }
}
