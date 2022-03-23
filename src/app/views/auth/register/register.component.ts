import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { Account } from 'src/app/shared/model/account.model';
import { RegisterAccountInfo, RegisterAlumniDto, RegisterWorkInfo } from 'src/app/shared/dto/register-alumni.dto';
import { Profile } from 'src/app/shared/model/profile.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/service/auth.service';
import { JobProfile } from 'src/app/shared/model/job-profile.model';
import { MatSnackBar } from '@angular/material/snack-bar';



const password = new FormControl('', Validators.required);

//to validate if the password was equal to the confirm password
const confirmPassword = new FormControl('', CustomValidators.equalTo(password)); 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  
})
export class RegisterComponent implements OnInit {

  /**
   * for data entry of account info
   */
  form1 : FormGroup = Object.create(RegisterAccountInfo);
 

  /**
   * for data entry of work info
   */
  form2 : FormGroup = Object.create(RegisterWorkInfo);

  submitDisable !: boolean;
 

  constructor(
    private readonly http: HttpClient,
    private authService : AuthService,
    public snackBar: MatSnackBar
  ) {
    this.submitDisable = false;
  }

  ngOnInit(): void {
   

    this.form1 = new FormGroup({      
      ReferenceNbr : new FormControl('', [Validators.required]),
      BatchYr : new FormControl('',  [Validators.required]),
      ContactNo : new FormControl(''),
      Email : new FormControl('',  [Validators.required, Validators.email]),
      Password : password,
      ConfirmPassword : confirmPassword,
      FirstName : new FormControl('',  [Validators.required]),
      LastName : new FormControl('', [Validators.required]),
      MiddleName : new FormControl(''),
    });


    this.form2 = new FormGroup({      
      Company : new FormControl('', [Validators.required]),
      CompanyAddress : new FormControl('', [Validators.required]),
      IsYourJobRelated : new FormControl(true),
      Position : new FormControl(''), 
      NoOfYrs : new FormControl(''),
    })
     

  }
  

  onRegister(): void { 

    const profile : Profile = {
      id : null,
      FirstName : this.form1.get('FirstName')?.value,
      LastName : this.form1.get('LastName')?.value,
      MiddleName : this.form1.get('MiddleName')?.value,      
    }


    const account : Account = {
        id : null, //make it null, to indicates that this record is for new account
        ReferenceNbr : this.form1.get('ReferenceNbr')?.value,
        AccountType : 'Alumni', 
        BatchYr : this.form1.get('BatchYr')?.value,
        ContactNo : this.form1.get('COntactNo')?.value,
        Email : this.form1.get('Email')?.value,
        Password : this.form1.get('Password')?.value,
        IsVerified : false, //not verified
        profile
    }

    const job_profile : JobProfile = {
      
      id : null,
      Company : this.form2.get('Company')?.value,
      CompanyAddress : this.form2.get('CompanyAddress')?.value,
      IsYourJobRelated : this.form2.get('IsYourJobRelated')?.value,
      Position : this.form2.get('Position')?.value,
      NoOfYrs : this.form2.get('NoOfYrs')?.value

    }
   


    const registerAlumniDto : RegisterAlumniDto = {
      account,
      profile,
      job_profile
    }
    

    this.authService.register(registerAlumniDto).subscribe(result => {

      this.snackBar.open('Thank you for signing up waiting for admin verification', 'Close', {
        duration: 2000,
        horizontalPosition : 'right',
        verticalPosition : 'top'
      });

      this.submitDisable = true;

      // this.form1.reset()
      // this.form2.reset();

    })




  }



}
