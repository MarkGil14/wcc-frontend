import { Profile } from "./profile.model";

export class Account {

    id !: any;

    ReferenceNbr !: string;

    AccountType ! : 'alumni' | 'admin';


    BatchYr ! : string;

 
    ContactNo !: string;

 
    Email !: string;

 
    Password !: string;

  
    IsVerified !: boolean;

    
    profile ?: Profile;


}