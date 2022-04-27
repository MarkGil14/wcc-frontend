import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LandingRoutingModule } from "./landing-routing.module";
import { LandingComponent } from "./landing.component";
import { AboutComponent } from "./about.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    declarations: [
      LandingComponent,
      AboutComponent,
    ],
    imports: [
      CommonModule,
      LandingRoutingModule, 
      NgbModule

    ]
  })
  export class LandingModule { 


 

  }
  