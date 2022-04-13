import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search.routing';



@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    QuillModule.forRoot(),    
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    SearchRoutingModule,
    Ng2SearchPipeModule
  ]
})
export class SearchModule { }
