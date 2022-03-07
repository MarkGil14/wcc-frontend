import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LoginCredentialDto } from "../dto/login-credential.dto";
import { RegisterAlumniDto } from "../dto/register-alumni.dto";
import { Announcement } from "../model/announcement.model";
import { httpOptions } from "./http-options";

 
  
@Injectable({
    providedIn: 'root'
})
export class AnnouncementService {



    constructor(
        private readonly http: HttpClient,
        private readonly _router: Router,
    ) { 


    }


    getAnnouncement() : Observable<any> {

        return this.http.get(`${environment.api.announcement}`, httpOptions)
        .pipe(retry(0));  

    }

 

    saveAnnouncement(announcement : Announcement) : Observable<any> {

        return this.http.post(`${environment.api.announcement}`, announcement , httpOptions)
        .pipe(retry(0));  

    }

 



}

