import { Injectable } from '@angular/core';

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
 
  {
    state: 'profile',
    name: 'Profile',
    type: 'link',
    icon: 'account_circle',
  },
  
];


@Injectable()
export class HorizontalMenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
