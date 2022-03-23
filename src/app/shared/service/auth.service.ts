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

 
  
@Injectable({
    providedIn: 'root'
})
export class AuthService {



    constructor(
        private readonly http: HttpClient,
        private readonly _router: Router,
        private readonly store : LocalStoreService
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
        this.store.setItem('profile', loginResponse.profile);
    
        this.store.setItem('loginAuth', loginResponse); 
    
      }
    

}

