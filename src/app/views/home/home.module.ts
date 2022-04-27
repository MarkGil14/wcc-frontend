import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { DemoMaterialModule } from "src/app/demo-material-module";
import { StudentListComponent } from "../student/student-list/student-list.component";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
    declarations: [
      HomeComponent,
    ],
    imports: [
      CommonModule,
      DemoMaterialModule,
      FlexLayoutModule,
      HomeRoutingModule,
      Ng2SearchPipeModule,
      NgxDatatableModule,
      FormsModule,
      ReactiveFormsModule,  
      NgbModule

    ]
})
export class HomeModule { }
