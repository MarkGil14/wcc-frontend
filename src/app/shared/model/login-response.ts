import { Account } from "./account.model";
import { Profile } from "./profile.model";

export interface LoginResponse {

    email?: string;
    isVerified?: boolean;
    username?: string;
    lastName?: string;
    firstName?: string;
    userToken?: string;
    accessToken?: string;
    token?: string;
    lastLogin?: Date;
    error?: any;

    account? : Account;
    profile : Profile;
    
  }
  