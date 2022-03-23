import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  private ls = window.localStorage;
  constructor() { }

  public setItem(key : any, value : any) {
    value = JSON.stringify(value);
    if (key.toLowerCase() == 'accesstoken') {
      this.ls.setItem(key, value.replace(/['"]+/g, ''));
    } else {
      this.ls.setItem(key, value);
    }
   
    return true;
  }

  public getItem(key: any) {
    const value: any= this.ls.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      // console.log(e)
      return null;
    }
  }

  public removeItem(key: any) {
    this.ls.removeItem(key);
  }

  public clear() {
    this.ls.clear();
  }
}
