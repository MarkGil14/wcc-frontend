import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Announcement } from "../model/announcement.model";
import { Job } from "../model/job.model";
import { httpOptions } from "./http-options";
 
const httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded', 
    })
  };

@Injectable({
    providedIn: 'root'
})
export class JobService {



    constructor(
        private http: HttpClient,
        private readonly _router: Router,
    ) { 


    }


    getJob() : Observable<any> {

        // return this.http.get(`${environment.api.job}?filter=isActive||$eq||1&join=announcement_images&sort=id,DESC`, httpOptions)
        return this.http.get(`${environment.api.job}?filter=isActive||$eq||1&sort=id,DESC`, httpOptions)
        .pipe(retry(0));  

    }

    
    getImage(filename : string) : Observable<any> {
           
        return this.http.get(`${environment.api.announcement}/image/${filename}`, { responseType: 'blob' })
        .pipe(retry(0));  

    }


    saveJob(job : Job) : Observable<any> {
        return this.http.post(`${environment.api.job}`, job , httpOptions)
        .pipe(retry(0));  

    }

  
    deleteJob(id : any) : Observable<any> {
        return this.http.delete(`${environment.api.job}/${id}`, httpOptions)
        .pipe(retry(0));  

    }
    
    saveCompanyBanner(id : any, file : any) : Observable<any> {
        
        return this.http.post(`${environment.api.job}/banner/${id}`, file)
        .pipe(retry(0));  


    }

    
    
    saveCompanyLogo(id : any, file : any) : Observable<any> {
        
        return this.http.post(`${environment.api.job}/logo/${id}`, file)
        .pipe(retry(0));  

    }



}

