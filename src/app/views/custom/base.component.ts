import { Account } from "src/app/shared/model/account.model";
import { Profile } from "src/app/shared/model/profile.model";
import { LocalStoreService } from "src/app/shared/service/local-store.service";

export class BaseCustomComponent {

    account !: Account;
    profile !: Profile;


    constructor() { 
    

        const store = new LocalStoreService()    
        this.account = store.getItem('account');
        this.profile = store.getItem('profile'); 
    
    
    }
     
    
    

}