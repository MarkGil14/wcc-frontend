import { Profile } from "./profile.model";

export class Account {

    id !: any;

    ReferenceNbr !: string;

    AccountType ! : 'Alumni' | 'Admin';


    BatchYr ! : string;

 
    ContactNo !: string;

 
    Email !: string;

 
    Password !: string;

  
    IsVerified !: boolean;

    isActive ?: boolean;
    
    profile ?: Profile;


}