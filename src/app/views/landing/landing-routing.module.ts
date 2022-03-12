import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";  
import { AboutComponent } from "./about.component";
import { LandingComponent } from "./landing.component";

export const routes: Routes = [
  
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },

]



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingRoutingModule {
}

