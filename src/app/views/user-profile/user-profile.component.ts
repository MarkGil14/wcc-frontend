import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidators } from 'ngx-custom-validators';
import { ChangePassswordDto } from 'src/app/shared/dto/change-password.dto';
import { JobProfile } from 'src/app/shared/model/job-profile.model';
import { Profile } from 'src/app/shared/model/profile.model';
import { LocalStoreService } from 'src/app/shared/service/local-store.service';
import { StudentService } from 'src/app/shared/service/student.service';
import { BaseCustomComponent } from '../custom/base.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent  extends BaseCustomComponent  implements OnInit {
  
  changePasswordForm : FormGroup = Object.create(ChangePassswordDto);

  accountForm !: FormGroup;

  jobProfileForm : FormGroup = Object.create(JobProfile);


  accountProfile !: Profile;

  accountJobProfile !: JobProfile;

  constructor(

    readonly studentService : StudentService,
    public snackBar: MatSnackBar, 


  ) {
    super() 
    if(this.profile.job_profiles)
      this.accountJobProfile = this.profile?.job_profiles[0];
    
   }

  ngOnInit(): void {


    //account form
    this.accountForm = new FormGroup({
      id : new FormControl(this.account.id, Validators.required),
      Email : new FormControl(this.account?.Email),
      ContactNo : new FormControl(this.account?.ContactNo),
    })



    //job profile form
    this.jobProfileForm = new FormGroup({
      JobProfileID : new FormControl(this.profile.id, Validators.required),
      Company : new FormControl(this.accountJobProfile?.Company),
      CompanyAddress : new FormControl(this.accountJobProfile?.CompanyAddress),
      IsYourJobRelated : new FormControl(this.accountJobProfile?.IsYourJobRelated),
      Position : new FormControl(this.accountJobProfile?.Position),
      NoOfYrs : new FormControl(this.accountJobProfile?.NoOfYrs),
    })





    //change password form
    const oldPassword = new FormControl(this.account.Password);
    const newPassword = new FormControl('', Validators.required);

    this.changePasswordForm = new FormGroup({
      OldPassword : oldPassword,
      TryOldPassword : new FormControl('', [Validators.required, CustomValidators.equalTo(oldPassword)]),
      NewPassword : newPassword,
      RetryPassword : new FormControl('', [Validators.required, CustomValidators.equalTo(newPassword)]),
    })

  }



  changePassword() {


    const valid = this.changePasswordForm.valid;
 

    if(valid) {

      const changePassAccount : any = {
        id : this.account.id,
        Password : this.changePasswordForm.get('NewPassword')?.value
      }
  


      this.studentService.updateAccount(changePassAccount).subscribe(updatedAccount => {
        


        //reset the form
        this.changePasswordForm.patchValue({
          OldPassword : updatedAccount.Password,
          TryOldPassword : null,
          NewPassword : null,
          RetryPassword : null
        });

        this.snackBar.open('Password was Successfully Changed', 'Close', {
          duration: 2000,
          horizontalPosition : 'right',
          verticalPosition : 'top'
        });

        const store = new LocalStoreService()    
        store.setItem('account', updatedAccount);




      })
      

    }




  }


  updateAccount(){

    
    
    const valid = this.accountForm.valid;

    if(valid) {

      const updateAccountPayload : any = { 
        id : this.account.id,
        ContactNo : this.accountForm.get('ContactNo')?.value,
        Email : this.accountForm.get('Email')?.value
      }

      
      this.studentService.updateAccount(updateAccountPayload).subscribe(updatedAccount => {
        


        //reset the form       

        this.snackBar.open('Account was Successfully Updated', 'Close', {
          duration: 2000,
          horizontalPosition : 'right',
          verticalPosition : 'top'
        });

        const store = new LocalStoreService()    
        store.setItem('account', updatedAccount);




      })

    }

  }


  updateJobProfile(){


    
    const valid = this.jobProfileForm.valid;
 

    if(valid) {

      const updateJobProfile : JobProfile = {
        id : this.accountJobProfile?.id,
        profileId : this.profile.id,
        Company : this.jobProfileForm.get('Company')?.value,
        CompanyAddress : this.jobProfileForm.get('CompanyAddress')?.value,
        IsYourJobRelated : this.jobProfileForm.get('IsYourJobRelated')?.value,
        Position : this.jobProfileForm.get('Position')?.value,
        NoOfYrs : this.jobProfileForm.get('NoOfYrs')?.value,
      }
  


      this.studentService.updateJobProfile(updateJobProfile).subscribe(updatedProfile => {
        
 
        this.snackBar.open('Your Job Profile was Successfully Updated', 'Close', {
          duration: 2000,
          horizontalPosition : 'right',
          verticalPosition : 'top'
        });

        const store = new LocalStoreService()    
        store.setItem('profile', updatedProfile);


        if(updatedProfile.job_profiles)
          this.accountJobProfile = updatedProfile?.job_profiles[0];
  
 
      })
      

    }



  }

}
