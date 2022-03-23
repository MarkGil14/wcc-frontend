import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LoginCredentialDto } from "../dto/login-credential.dto";
import { RegisterAlumniDto } from "../dto/register-alumni.dto";
import { Announcement } from "../model/announcement.model";
import { httpOptions } from "./http-options";
 
const httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded', 
    })
  };

@Injectable({
    providedIn: 'root'
})
export class AnnouncementService {



    constructor(
        private http: HttpClient,
        private readonly _router: Router,
    ) { 


    }


    getAnnouncement() : Observable<any> {

        return this.http.get(`${environment.api.announcement}?filter=isActive||$eq||1&join=announcement_images&sort=id,DESC`, httpOptions)
        .pipe(retry(0));  

    }

 

    saveAnnouncement(announcement : Announcement) : Observable<any> {
        console.log(announcement);
        return this.http.post(`${environment.api.announcement}`, announcement , httpOptions)
        .pipe(retry(0));  

    }

 

    saveAnnouncementImages(announcementId : any, files : any) : Observable<any> {
 
          
        return this.http.post(`${environment.api.announcement}/images/${announcementId}`, files)
        .pipe(retry(0));  

    }



    
    getImage(filename : string) : Observable<any> {
           
        return this.http.get(`${environment.api.announcement}/image/${filename}`, { responseType: 'blob' })
        .pipe(retry(0));  

    }



}

