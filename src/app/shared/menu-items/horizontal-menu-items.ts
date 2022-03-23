import { Injectable } from '@angular/core';
import { Account } from '../model/account.model';
import { LocalStoreService } from '../service/local-store.service';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const ADMIN_MENUITEMS = [
  {
    state: 'home',
    name: 'Home',
    type: 'link',
    icon: 'home',
  },
  {
    state: 'announcement',
    name: 'Announcement',
    type: 'link',
    icon: 'announcement',
  },
  {
    state: 'student',
    name: 'Alumni',
    type: 'sub',
    icon: 'account_circle',
    children : [
      {
        state : "pending",
        name : "Pending Account",
        type : "link",
      },
      {
        state : "list",
        name : "Alumni List",
        type : "link",
      },

    ]
  }, 
  {
    state: 'import',
    name: 'Import',
    type: 'link',
    icon: 'download',
  },
  
];

const MENUITEMS = [
  {
    state: 'home',
    name: 'Home',
    type: 'link',
    icon: 'home',
  },
  {
    state: 'announcement',
    name: 'Announcement',
    type: 'link',
    icon: 'announcement',
  },    
];
@Injectable()
export class HorizontalMenuItems {

  constructor(readonly store : LocalStoreService){}

  account !: Account;

  getMenuitem(): Menu[] {
 
    this.account = this.store.getItem('account'); 

    return this.account?.AccountType == 'Admin' ? ADMIN_MENUITEMS : MENUITEMS;
  }

  
}
