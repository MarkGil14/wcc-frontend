import { Component } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LocalStoreService } from 'src/app/shared/service/local-store.service';
import { Account } from 'src/app/shared/model/account.model';
import { Profile } from 'src/app/shared/model/profile.model';
import { StudentService } from 'src/app/shared/service/student.service';
import { BaseCustomComponent } from 'src/app/views/custom/base.component';
@Component({
  selector: 'app-horizontal-header',
  templateUrl: './horizontal-header.component.html',
  styleUrls: [],
})
export class HorizontalAppHeaderComponent extends BaseCustomComponent {
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private translate: TranslateService, private router : Router, private store : LocalStoreService) {


    super()
    

  }

  changeLanguage(lang: any): void {

  }


  logout() {
    this.store.removeItem('account');
    this.store.removeItem('profile');
    this.store.removeItem('loginAuth');
    this.store.removeItem('accountType');
    this.store.removeItem('accessToken');
    
    this.router.navigate(['../auth/login'])
  }

  navigateProfile() {
    this.router.navigate(['/app/profile'])
  }

  
}
