import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Announcement } from 'src/app/shared/model/announcement.model';
import { AnnouncementService } from 'src/app/shared/service/announcement.service';



@Component({
  selector: 'app-announcement-dialog',
  template: `
    <h3 class="m-t-0">Compose Announcement</h3>
    <form class="basic-form">
      <div fxLayout="row" fxLayoutWrap="wrap">
        <!-- column -->
        <div fxFlex.gt-sm="50" fxFlex="50">
          <mat-form-field>
            <input matInput placeholder="Title" type="email" />
          </mat-form-field>
        </div>
        <!-- column -->
        <div fxFlex.gt-sm="50" fxFlex="50">
          <mat-form-field>
            <input matInput placeholder="Author" type="text" />
          </mat-form-field>
        </div>
      </div>
      <div fxLayout="row" fxLayoutWrap="wrap">
        <!-- column -->
        <div fxFlex.gt-sm="100" fxFlex="100">
          <quill-editor [style]="{ height: '200px' }"></quill-editor>
        </div>
      </div>
      <div fxLayout="row" fxLayoutWrap="wrap">
        <!-- column -->
        <div fxFlex.gt-sm="100" fxFlex="100" class="mini-spacer">
          <button mat-raised-button color="primary">Post</button>
          <button mat-raised-button color="warning" class="m-l-30" mat-dialog-close >Close</button>
        </div>
      </div>
    </form>
  `,
})
export class AnnouncementDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

  constructor( public dialog: MatDialog, private announcementService : AnnouncementService, public snackBar: MatSnackBar) { }
 
  
  announcementContent !: any;


  announcementForm : FormGroup = Object.create(Announcement);



  announcements : Announcement[] = [];



  ngOnInit(): void {


    this.announcementForm = new FormGroup({      
      Title : new FormControl('', [Validators.required]),
      Description : new FormControl('', [Validators.required]),
      Author : new FormControl('', [Validators.required]),
      DatePublish : new FormControl(new Date()),
      Location : new FormControl(''),
    })

    // this.announcementContent = this.announcementContent ?? new FormControl()


    /**
     * auto load all announcement
     */
    this.announcementService.getAnnouncement().subscribe(announcements => {

      this.announcements = announcements;

    })
           

  }

    // Compose button
    openDialog(): void {
      const dialogRef = this.dialog.open(AnnouncementDialogComponent, {});
  
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
 
    





    onPostAnnouncement() {
 

      if(this.announcementForm.valid) {

        const announcement : Announcement = this.announcementForm.value;


        this.announcementService.saveAnnouncement(announcement).subscribe((result : any) => {


          this.snackBar.open('Announcement was Successfully Posted', 'Close', {
            duration: 2000,
            horizontalPosition : 'right',
            verticalPosition : 'top'
          });


          this.announcements.unshift(result);

          this.announcementForm.reset();
          this.announcementForm.markAsPristine();


        })

      }
      


    }




}
