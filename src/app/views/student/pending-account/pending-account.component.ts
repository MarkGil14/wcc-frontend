import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Account } from "src/app/shared/model/account.model";
import { StudentService } from "src/app/shared/service/student.service";
import { ViewPendingAccountComponent } from "./view-pending-account.component";
 
@Component({
    selector: 'app-pending-account',
    templateUrl: './pending-account.component.html',
    styleUrls: [],
    providers : []
})
export class PendingAccountComponent implements OnInit {


    rows : Account[] = [];
    temp = [];

    columns = [
        { prop: 'ReferenceNbr', name : 'Reference Nbr' }, 
        { prop : 'profile.FirstName', name : 'First Name' }, 
        { prop : 'profile.LastName', name : 'Last Name' }, 
        { prop : 'BatchYr', name : 'Batch Yr' }, 
    ];


    loadingIndicator = true;
    reorderable = true;
    editing = {};
    
 

    constructor(
        private readonly studentService : StudentService,
        public dialog: MatDialog,
        private readonly snackBar : MatSnackBar

    ){
 
    }
 
  
    ngOnInit(): void {

        this.loadAllPendingAccount();
    
    
    }
   
 

    /**
     * method to load all pending account
     */
    loadAllPendingAccount() {
        this.studentService.getPendingAccount().subscribe(data => {
            console.log(data)
            this.rows = data;

            setTimeout(() => {
                this.loadingIndicator = false;
            }, 1500);

        })
    }

    
  viewPendingAccount(account : any){

    this.dialog.open(ViewPendingAccountComponent, {
        width : '600px',
        data : { account }
    });

  }



  confirmVerifyAccount(account : Account) {

    this.studentService.confirmVerify(account).subscribe(result => {
        this.loadAllPendingAccount()

        this.snackBar.open('Account was Successfully Activated', 'Close', {
            duration: 2000,
            horizontalPosition : 'right',
            verticalPosition : 'top'
          });
    
    })

  }




  inactiveAccount(account : Account) {

    this.studentService.inactiveAccount(account).subscribe(result => {
        this.loadAllPendingAccount()

        this.snackBar.open('Account was Successfully Inactivate', 'Close', {
            duration: 2000,
            horizontalPosition : 'right',
            verticalPosition : 'top'
          });
    
    })

  }




}

