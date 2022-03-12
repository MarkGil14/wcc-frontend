import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileRoutingModule } from './profile-routing.module';
import { AdminProfileComponent } from './admin-profile.component';



@NgModule({
  declarations: [
    ProfileComponent,
    AdminProfileComponent,
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
