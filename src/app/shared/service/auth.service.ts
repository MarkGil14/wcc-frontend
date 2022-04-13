import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LoginCredentialDto } from "../dto/login-credential.dto";
import { RegisterAlumniDto } from "../dto/register-alumni.dto";
import { LoginResponse } from "../model/login-response";
import { httpOptions } from "./http-options";
import { LocalStoreService } from "./local-store.service";
import { StudentService } from "./student.service";

 
  
@Injectable({
    providedIn: 'root'
})
export class AuthService {



    constructor(
        private readonly http: HttpClient,
        private readonly _router: Router,
        private readonly store : LocalStoreService,
        readonly studentService : StudentService
    ) { 


    }



    login(loginCredential : LoginCredentialDto) : Observable<any> {

        return this.http.post(`${environment.api.authentication}/login`, loginCredential, httpOptions)
        .pipe(retry(0));  

    }



    register(alumni : RegisterAlumniDto) : Observable<any> {

        return this.http.post(`${environment.api.authentication}/alumni-register`,alumni, httpOptions)
        .pipe(retry(0));
  

    }



    setUserInLocalStorage(loginResponse: LoginResponse) {

        this.store.setItem('accessToken', loginResponse.token);
        this.store.setItem('accountType', loginResponse.account?.AccountType);
        this.store.setItem('account', loginResponse.account);
    
        this.store.setItem('loginAuth', loginResponse); 

        const profile = loginResponse.profile;

        
        if(profile?.Avatar)
        this.studentService.getImage(profile.Avatar).subscribe(imgPath => {

                let reader = new FileReader();
                
                profile.Avatar = reader.readAsDataURL(imgPath);
        
                reader.onload = _event => {
                    profile.Avatar = reader.result; //image declared earlier
                    this.store.setItem('profile', profile);                    
    
                };
         

        });
        else {


            profile.Avatar = 'assets/images/users/default.jpg';
            this.store.setItem('profile', profile);

        }





    
      }
    

}

