import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementComponent, AnnouncementDialogComponent } from './announcement.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout'; 
import { AnnouncementRoutingModule } from './announcement-routing.module';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { AnnouncementReadComponent } from './announcement-read.component';



@NgModule({
  declarations: [
    AnnouncementComponent,
    AnnouncementDialogComponent,
    AnnouncementReadComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    QuillModule.forRoot(),    
    AnnouncementRoutingModule,
    FormsModule,
    ReactiveFormsModule,  
    MatFileUploadModule

  ]
})
export class AnnouncementModule { }
