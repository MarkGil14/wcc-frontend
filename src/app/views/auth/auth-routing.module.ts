import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingComponent } from "../landing/landing.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";


export const AuthRoutes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },


]



@NgModule({
    imports: [RouterModule.forChild(AuthRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}

