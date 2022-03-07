import { Account } from "../model/account.model";
import { JobProfile } from "../model/job-profile.model";
import { Profile } from "../model/profile.model";



export class RegisterAlumniDto {

  
    account !: Account;

    profile !: Profile;

    job_profile !: JobProfile;


}




export class RegisterAccountInfo {

    ReferenceNbr !: string;
    BatchYr ! : string; 
    ContactNo !: string;
    Email !: string;
    Password !: string;
    ConfirmPassword !: string;
    FirstName !: string;
    LastName !: string;
    MiddleName !: string;
    Gender !: string;
    BirthDate !: Date;


}



export class RegisterWorkInfo {


    
 
    Company !: string;
    CompanyAddress !: string;
    IsYourJobRelated !: boolean;
    Position !: string;
    NoOfYrs !: string; 



 

}