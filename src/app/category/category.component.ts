import { NotificationService } from "./../../../appservices/notification.service";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "./../../../appservices/product.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "models/product.model";
import { PageEvent } from "@angular/material";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  //products-box
  currentCollection: string;
  currentCollectionProducts: Product[] = [];

  isLoading: boolean;

  //temporary
  products: Product[] = [];

  //paginator
  length: number;
  currentPage = 1;

  //minmax
  private currentmin: number;
  private currentmax: number;

  constructor(
    private productservice: ProductService,
    private route: ActivatedRoute,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    //enable spinner
    this.isLoading = true;

    //initialise min-max to default values
    this.currentmin = 0;
    this.currentmax = 20000;

    this.route.paramMap.subscribe((paramMap) => {
      //get current collection from the link
      this.currentCollection = paramMap.get("cname");

      //spinner on
      this.isLoading = true;

      this.onChange();
    });
  }

  onChange() {
    //get cards with currentcollection,currentPage , currentmin, currentmax
    // and them in currentCollectionProducts, this emits an observable

    this.productservice.getCurrentProducts(
      this.currentCollection,
      this.currentPage,
      this.currentmin,
      this.currentmax
    );

    // listen
    this.productservice
      .getProductUpdateListener()
      .subscribe((result: { products: Product[]; productCount: number }) => {
        //allow=true spinner false
        this.isLoading = false;

        this.length = result.productCount;
        this.products = result.products;
      });
  }

  onPageChange(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    // spinner on
    this.isLoading = true;
    this.onChange();
  }

  onSearch(minmaxform: NgForm) {
    //spinner on
    this.isLoading = true;

    const minValue = minmaxform.value.min;
    const maxValue = minmaxform.value.max;

    if (minValue && maxValue) {
      if (maxValue >= minValue) {
        this.currentmin = minValue;
        this.currentmax = maxValue;
      } else {
        this.notificationservice.success("Invalid Price Range");
        this.currentmin = 0;
        this.currentmax = 20000;
        minmaxform.reset();
      }
    } else if (minValue && !maxValue) {
      this.currentmin = minValue;
      this.currentmax = 20000;
    } else if (!minValue && maxValue) {
      this.currentmax = maxValue;
      this.currentmin = 0;
    } else {
      this.currentmin = 0;
      this.currentmax = 20000;
    }

    this.onChange();
  }
}
