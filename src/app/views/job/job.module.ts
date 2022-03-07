import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDataExampleDialogComponent, JobComponent } from './job.component';
import { JobRoutingModule } from './job-routing.module';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';



@NgModule({
  declarations: [
    JobComponent,
    DialogDataExampleDialogComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    QuillModule.forRoot(),    
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    JobRoutingModule,
  ]
})
export class JobModule { }
