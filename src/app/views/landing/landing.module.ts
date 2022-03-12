import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LandingRoutingModule } from "./landing-routing.module";
import { LandingComponent } from "./landing.component";
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { AboutComponent } from "./about.component";



@NgModule({
    declarations: [
      LandingComponent,
      AboutComponent
    ],
    imports: [
      CommonModule,
      LandingRoutingModule, 
      MatCarouselModule.forRoot()

    ]
  })
  export class LandingModule { 


 

  }
  