import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Account } from 'src/app/shared/model/account.model';
import { Announcement } from 'src/app/shared/model/announcement.model';
import { Profile } from 'src/app/shared/model/profile.model';
import { AnnouncementService } from 'src/app/shared/service/announcement.service';
import { LocalStoreService } from 'src/app/shared/service/local-store.service';
import { BaseCustomComponent } from '../custom/base.component';



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
export class AnnouncementComponent extends BaseCustomComponent implements OnInit {
 
  constructor( 
      public dialog: MatDialog, 
      private announcementService : AnnouncementService, 
      public snackBar: MatSnackBar, 
      readonly router : Router
    ) { 

      super()

    }
 
  announcment_files:string [] = [];

  announcment_images_preview :string [] = [];

  announcementContent !: any;


  announcementForm : FormGroup = Object.create(Announcement);


  editMode : boolean = false;

  announcements : Announcement[] = [];



  ngOnInit(): void {


    this.announcementForm = new FormGroup({      
      id : new FormControl(''),
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
    this.loadAnnouncements();
           

  }

 

  loadAnnouncements() {
    this.announcementService.getAnnouncement().subscribe(announcements => {



      for (let index = 0; index < announcements.length; index++) {
        const announcement = announcements[index];

        announcement.announcement_images

        for (let i = 0; i < announcement.announcement_images.length; i++) {
          const img = announcement.announcement_images[i];
           
          this.announcementService.getImage(img.ImageUrl).subscribe(imgPath => {
          
            let reader = new FileReader();
          
            img.ImageUrl =  reader.readAsDataURL(imgPath);

            reader.onload = _event => {
              img.ImageUrl = reader.result; //image declared earlier
            };

          })
  
 
        }
        
      }

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
 
    


    onFileChange(event : any){
      for (var i = 0; i < event.target.files.length; i++) { 

          this.announcment_files.push(event.target.files[i]);

           
          const reader = new FileReader();
          reader.onload = () => {
            this.announcment_images_preview.push(reader.result as string)
          }
          
          reader.readAsDataURL(event.target.files[i])

      }
    }

 

    onPostAnnouncement() {
  
      if(this.announcementForm.valid) {

        const announcement : Announcement = this.announcementForm.value;
       

        this.announcementService.saveAnnouncement(announcement).subscribe((result : any) => {



          const formData = new FormData(); 
          for (let i = 0; i < this.announcment_files.length; i++) { 
            formData.append("file[]", this.announcment_files[i]);
          }
        
          this.announcementService.saveAnnouncementImages(result.id, formData).subscribe((resultImage : any) => {
          })
    


          this.snackBar.open('Announcement was Successfully Posted', 'Close', {
            duration: 2000,
            horizontalPosition : 'right',
            verticalPosition : 'top'
          });


          // this.announcements.unshift(result);

          this.loadAnnouncements();
          this.editMode = false;
          
          this.announcementForm.reset();
          this.announcementForm.markAsPristine();
          this.announcment_images_preview = [];
          this.announcment_files = [];

        })

      }
      


    }



    readAnnouncement(id : any) {

        this.router.navigateByUrl(`app/announcement/read?id=${id}`)

    }



    onEdit(announcement : any) {

      this.editMode = true;
      this.announcementForm.patchValue(announcement);

    }
 
    cancelEdit() {

      this.editMode = false;
      this.announcementForm.reset();
      this.announcementForm.markAsPristine();

    }
 

    
  onDelete(id : any) {

    this.announcementService.deleteAnnouncement(id).subscribe(data => {

      this.snackBar.open('Announcement was Successfully Deleted', 'Close', {
        duration: 2000,
        horizontalPosition : 'right',
        verticalPosition : 'top'
      });

      const index = this.announcements.findIndex(e => e.id == id);
      if(index) {
        this.announcements.splice(index, 1);
      }

    });

  }


}
