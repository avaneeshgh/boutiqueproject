import { ParticularComponent } from "./particular/particular.component";
import { CategoryComponent } from "./category/category.component";
import { CollectionsComponent } from "./collections/collections.component";
import { AdminEditProductComponent } from "./admin/admin-edit-product/admin-edit-product.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "appservices/auth-guard";
import { HomeComponent } from "./home/home.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { ServicesComponent } from "./services/services.component";
import { AdminLoginComponent } from "./admin/admin-login/admin-login.component";
import { AdminUpdateComponent } from "./admin/admin-update/admin-update.component";
import { GoalComponent } from "./goal/goal.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "aboutus", component: AboutUsComponent },
  { path: "contactus", component: ContactUsComponent },
  { path: "services", component: ServicesComponent },
  { path: "admin/login", component: AdminLoginComponent },
  { path: "collections", component: CollectionsComponent },
  { path: "collections/:cname", component: CategoryComponent },
  { path: "collections/:cname/:id", component: ParticularComponent },

  {
    path: "admin/update",
    component: AdminUpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/admin-edit-product/:id",
    component: AdminEditProductComponent,
    canActivate: [AuthGuard],
  },
  { path: "goal", component: GoalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
