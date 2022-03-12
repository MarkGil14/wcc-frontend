import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

 

export interface ViewPendingAccountDialogData {
    account : any
}
  

@Component({
    selector: 'app-view-pending-account',
    template: `
    
    
        <h1 mat-dialog-title>View Pending Account</h1>
        <div mat-dialog-content>



            <mat-card-content>

            <form class="basic-form"> 

            <div fxLayout="row wrap" fxFlexAlign="center" class="row">
              <!-- column -->
              <div fxFlex.gt-sm="30" fxFlex="100" class="p-10">

                <mat-form-field appearance="fill">
                  <mat-label>Student Number</mat-label>
                    <input
                        matInput  
                        readonly
                        [value]="data.account.ReferenceNbr"
                    />
                </mat-form-field>


              </div>

              <div fxFlex.gt-sm="30" fxFlex="100" class="p-10">

                
              <mat-form-field appearance="fill">
              <mat-label>Batch Graduated</mat-label>
                  <input
                    readonly
                    [value]="data.account.BatchYr"
                    matInput
                  />
              </mat-form-field> 

              </div>       
              
              
              <div fxFlex.gt-sm="30" fxFlex="100" class="p-10">

                <mat-form-field appearance="fill">
                  <mat-label>Contact Number</mat-label>
                  <input
                        readonly
                        [value]="data.account.ContactNo"
                        matInput
                      />
                </mat-form-field>  
              </div> 


            </div>


            <div fxLayout="row wrap" fxFlexAlign="center" class="row">
              <!-- column -->
              <div fxFlex.gt-sm="30" fxFlex="100" class="p-10">

              <mat-form-field appearance="fill">
              <mat-label>Last Name</mat-label>
                <input
                    readonly
                    [value]="data.account.profile.LastName"
                    matInput
                    />
                </mat-form-field>  
              </div> 

              <div fxFlex.gt-sm="30" fxFlex="100" class="p-10">

               <mat-form-field appearance="fill">
                 <mat-label>First Name</mat-label>
                  <input
                    readonly
                    [value]="data.account.profile.FirstName"
                    matInput
                  />
                </mat-form-field>  
              </div> 


              <div fxFlex.gt-sm="30" fxFlex="100" class="p-10">

               <mat-form-field appearance="fill">
                  <mat-label>Middle Name</mat-label>
                  <input
                    readonly
                    [value]="data.account.profile.MiddleName"
                    matInput
                  />
                </mat-form-field>  
              </div> 



            </div>


          </form>

            </mat-card-content>


            </div>

            <mat-dialog-actions align="end">
            <button mat-button mat-dialog-close>Close</button>
            </mat-dialog-actions>
 
    `,
    styleUrls: [],
    providers : []
})
export class ViewPendingAccountComponent implements OnInit {




    constructor(
        public dialog: MatDialog,  
        public dialogRef: MatDialogRef<ViewPendingAccountComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ViewPendingAccountDialogData
        ){

    }

    
  
    ngOnInit(): void {


        console.log(this.data);
        

    }


}