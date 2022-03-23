import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { StudentRoutingModule } from './student-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { StudentListComponent } from './student-list/student-list.component';
import { PendingAccountComponent } from './pending-account/pending-account.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ViewPendingAccountComponent } from './pending-account/view-pending-account.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StudentViewProfileComponent } from './student-profile/student-view-profile.component';


@NgModule({
  declarations: [
    StudentListComponent,
    PendingAccountComponent,
    ViewPendingAccountComponent,
    StudentViewProfileComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FlexLayoutModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,  
    DemoMaterialModule,
    Ng2SearchPipeModule
  ],
  exports : [
  ]
})
export class StudentModule { }
