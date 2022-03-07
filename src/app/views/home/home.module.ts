import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCarouselModule } from "@ngmodule/material-carousel";
import { DemoMaterialModule } from "src/app/demo-material-module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";





@NgModule({
    declarations: [
      HomeComponent,
    ],
    imports: [
      CommonModule,
      DemoMaterialModule,
      FlexLayoutModule,
      HomeRoutingModule,
      MatCarouselModule.forRoot()
    ]
})
export class HomeModule { }
