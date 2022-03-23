import { Component } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LocalStoreService } from 'src/app/shared/service/local-store.service';
import { Account } from 'src/app/shared/model/account.model';
import { Profile } from 'src/app/shared/model/profile.model';
@Component({
  selector: 'app-horizontal-header',
  templateUrl: './horizontal-header.component.html',
  styleUrls: [],
})
export class HorizontalAppHeaderComponent {
  public config: PerfectScrollbarConfigInterface = {};

  account !: Account;
  profile !: Profile;

  constructor(private translate: TranslateService, private router : Router, private store : LocalStoreService) {
    this.account = this.store.getItem('account');
    this.profile = this.store.getItem('profile');
 

  }

  changeLanguage(lang: any): void {

  }


  logout() {
    this.router.navigate(['../auth/login'])
  }

  navigateProfile() {
    this.router.navigate(['/app/profile'])
  }

  
}
