import { ErrorInterceptor } from "./error-interceptor";
import { AuthInterceptor } from "./../../appservices/auth-interceptor";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatProgressBarModule,
  MatSelectModule,
  MatDividerModule,
  MatMenuModule,
  MatDialogModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatRadioModule,
} from "@angular/material";

import { GoalComponent } from "./goal/goal.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ServicesComponent } from "./services/services.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { AdminLoginComponent } from "./admin/admin-login/admin-login.component";
import { AdminUpdateComponent } from "./admin/admin-update/admin-update.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { CategoriesnavComponent } from "./categoriesnav/categoriesnav.component";
import { MainfooterComponent } from "./mainfooter/mainfooter.component";
import { AdminEditProductComponent } from "./admin/admin-edit-product/admin-edit-product.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { CollectionsComponent } from "./collections/collections.component";
import { CategoryComponent } from "./category/category.component";
import { ParticularComponent } from "./particular/particular.component";
import { CategoryCardComponent } from "./category-card/category-card.component";
import { UserInfoDialogComponent } from "./user-info-dialog/user-info-dialog.component";
import { ErrorComponent } from "./error/error/error.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    ServicesComponent,
    ContactUsComponent,
    AdminLoginComponent,
    AdminUpdateComponent,
    GoalComponent,
    MainNavComponent,
    CategoriesnavComponent,
    MainfooterComponent,
    AdminEditProductComponent,
    ProductCardComponent,
    ConfirmDialogComponent,
    CollectionsComponent,
    CategoryComponent,
    ParticularComponent,
    CategoryCardComponent,
    UserInfoDialogComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule,
    MatDividerModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatRadioModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent,
    UserInfoDialogComponent,
    ErrorComponent,
  ],
})
export class AppModule {}
