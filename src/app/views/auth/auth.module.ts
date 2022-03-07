import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {   AuthRoutingModule } from './auth-routing.module'; 
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
 
 


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule, 
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,  
    DemoMaterialModule
  ]
})
export class AuthModule { }
