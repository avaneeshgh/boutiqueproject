import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "./../models/product.model";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { NotificationService } from "./notification.service";

//environment
import { environment } from "./../src/environments/environment";

const BACKEND_PROD = environment.apiUrl + "/product";
const BACKEND_CATEG = environment.apiUrl + "/category";

@Injectable({ providedIn: "root" })
export class ProductService {
  constructor(
    private http: HttpClient,
    public router: Router,
    private notificationservice: NotificationService
  ) {}

  private products: Product[] = [];
  private productCount: number;
  private productsUpdated = new Subject<{
    products: Product[];
    productCount: number;
  }>();

  //return observalble as listener
  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  //post product
  postProduct(product: {
    productname: string;
    producttype: string;
    imgurl: string;
    price: number;
    description: string;
  }) {
    //create a product with id=null later while getting products we add mongodb _id
    const productsent: Product = {
      id: null,
      productname: product.productname,
      producttype: product.producttype,
      imgurl: product.imgurl,
      price: product.price,
      description: product.description,
    };

    //post request
    this.http
      .post<{ message: string; productid: string }>(BACKEND_PROD, productsent)
      .subscribe((result) => {
        console.log(result);

        //snackbar notification
        this.notificationservice.success("Product Sent!!");

        //navigate to collections
        this.router.navigate(["/collections"]);
      });
  }

  //get single product by id
  getProduct(id: string) {
    return this.http.get<{ message: string; product: any }>(
      BACKEND_PROD + "/" + id
    );
  }

  //update a product

  updateProduct(product: Product) {
    //put request
    this.http
      .put<{ message: string }>(BACKEND_PROD + "/" + product.id, product)
      .subscribe((result) => {
        //console.log(result.message);
        this.router.navigate(["/collections"]);

        //snackbar
        this.notificationservice.success("Product Edit Successful!");
      });
  }

  //deletion of product

  deleteProduct(id: string) {
    //delete
    return this.http.delete<{ message: string }>(BACKEND_PROD + "/" + id);
  }

  //get products of each specified category and currentpage and pricerange

  getCurrentProducts(
    cname: string,
    currentPage: number,
    minPrice: number,
    maxPrice: number
  ) {
    const queryParams = `?currentPage=${currentPage}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    //get request
    this.http
      .get<{
        message: string;
        currentCollectionProductsBetweenMinAndMax: any;
        currentCollectionProductsCountBetweenMinAndMax: number;
      }>(BACKEND_CATEG + "/" + cname + queryParams)
      .pipe(
        map((currentCollectionData) => {
          return {
            products: currentCollectionData.currentCollectionProductsBetweenMinAndMax.map(
              (el) => {
                return {
                  id: el._id,
                  productname: el.productname,
                  producttype: el.producttype,
                  imgurl: el.imgurl,
                  price: el.price,
                  description: el.description,
                };
              }
            ),
            productsCount:
              currentCollectionData.currentCollectionProductsCountBetweenMinAndMax,
          };
        })
      )
      .subscribe((afterRefining) => {
        //store in products and productCount and notify the app;
        this.products = afterRefining.products;
        this.productCount = afterRefining.productsCount;

        //notify
        this.productsUpdated.next({
          products: [...this.products],
          productCount: this.productCount,
        });
      });
  }

  getCount(collectionname: string) {
    const cname = { cname: collectionname };
    return this.http.post<{ pcount: number }>(BACKEND_CATEG + "/", cname);
  }
}
