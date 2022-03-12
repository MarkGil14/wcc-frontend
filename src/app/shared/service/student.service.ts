import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LoginCredentialDto } from "../dto/login-credential.dto";
import { RegisterAlumniDto } from "../dto/register-alumni.dto";
import { Account } from "../model/account.model";
import { Announcement } from "../model/announcement.model";
import { httpOptions } from "./http-options";

 
  
@Injectable({
    providedIn: 'root'
})
export class StudentService {



    constructor(
        private readonly http: HttpClient,
        private readonly _router: Router,
    ) { 


    }


    getPendingAccount() : Observable<any> {

        return this.http.get(`${environment.api.student}?filter=IsVerified||$eq||0&filter=AccountType||$eq||alumni&filter=isActive||$eq||1&join=profile&join=profile.job_profiles`, httpOptions)
        .pipe(retry(0));  

    }

 


    confirmVerify(account : Account) : Observable<any> {

        return this.http.post(`${environment.api.student}/confirm-verify`, account, httpOptions)
        .pipe(retry(0));  

    }
 
    inactiveAccount(account : Account) : Observable<any> {

        return this.http.post(`${environment.api.student}/inactive-account`, account, httpOptions)
        .pipe(retry(0));  

    }


}

