import { T } from "@angular/cdk/keycodes";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { LoginCredentialDto } from "src/app/shared/dto/login-credential.dto";
import { AuthService } from "src/app/shared/service/auth.service";
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [],
    providers : [AuthService]
})
export class LoginComponent implements OnInit {



    public form: FormGroup = Object.create(null);

    constructor( 
      
      private router: Router, private authService : AuthService, public snackBar: MatSnackBar) {

    }
  
  
    ngOnInit(): void {

      this.form = new FormGroup({      
        ReferenceNbr : new FormControl('', [Validators.required]),
        Password : new FormControl('', [Validators.required]),
      })
             

    }
  
  
  
    onSubmit(): void {
  
   
   
      // this.router.navigate(['/setting/company']);

      const authCredential : LoginCredentialDto = {
        ReferenceNbr : this.form.get('ReferenceNbr')?.value,
        Password : this.form.get('Password')?.value
      }

      if(this.form.valid) {

        this.authService.login(authCredential).subscribe((data : any) => {

          if(!data.error)  {
            this.router.navigate(['/app/home'])
          }else {

            // this.toastr.warning('LOGIN FAILED', data.error);
            this.snackBar.open(data.error, 'Close', {
              duration: 2000,
              horizontalPosition : 'right',
              verticalPosition : 'top'
            });

          }

        })

      }


   
      
    }


}