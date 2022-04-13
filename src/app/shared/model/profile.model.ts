import { JobProfile } from "./job-profile.model";

export class Profile {

 
    id !: any;


 
    AccountID ?: any;

 
    FirstName !: string;
 
    LastName !: string;

 
    MiddleName ?: string;
 
    Gender ?: string;

 
    BirthDate ?: Date;

 
    Avatar ?: any;


    job_profiles ?: JobProfile[];



}