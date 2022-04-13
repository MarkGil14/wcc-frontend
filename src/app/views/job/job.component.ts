import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MailService } from 'src/app/apps/mail/mail.service';
import { Message } from 'src/app/apps/mail/message';
import { Job } from 'src/app/shared/model/job.model';
import { JobService } from 'src/app/shared/service/job.service';
import { BaseCustomComponent } from '../custom/base.component';
import { JobModule } from './job.module';


@Component({
  selector: 'app-dialog-data-example-dialog',
  template: `
    <h3 class="m-t-0">Compose Email</h3>
    <form class="basic-form">
      <div fxLayout="row" fxLayoutWrap="wrap">
        <!-- column -->
        <div fxFlex.gt-sm="50" fxFlex="50">
          <mat-form-field>
            <input matInput placeholder="To" type="email" />
          </mat-form-field>
        </div>
        <!-- column -->
        <div fxFlex.gt-sm="50" fxFlex="50">
          <mat-form-field>
            <input matInput placeholder="Subject" type="text" />
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
          <button mat-raised-button color="primary">Send</button>
          <button mat-raised-button color="accent" class="m-l-30">Save as a Draft</button>
        </div>
      </div>
    </form>
  `,
})
export class DialogDataExampleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}



@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  providers: [MailService],
})
export class JobComponent extends BaseCustomComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 960px)`);

  public config: PerfectScrollbarConfigInterface = {};

  displayMode = 'default';

  editMode : boolean = false;

  jobs: Job[] = [];
  searchJob: any;

  selectedJob : Job = Object.create(null);
  messageOpen = false;
  sidePanelOpened = true;


  companyLogo : any;
  companyBanner : any;

  jobForm : FormGroup = Object.create(Job);


  constructor(
    public snackBar: MatSnackBar, 
    private jobService : JobService,
    public dialog: MatDialog
    ) {

      super()

    }

  ngOnInit(): void {


    this.jobForm = new FormGroup({      
      id : new FormControl(''),
      JobTitle : new FormControl('', [Validators.required]),
      JobDescription : new FormControl(''),
      Company : new FormControl('', [Validators.required]),
      Location : new FormControl('', [Validators.required]),
      ProcessingTime : new FormControl(''), 
      CarrerLevel : new FormControl(''), 
      YrsOfExp : new FormControl(''), 
      Qualification : new FormControl(''), 
      JobType : new FormControl(''), 
    })


    this.loadJobs();
  }

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }
 


  loadJobs() {

    this.jobService.getJob().subscribe((jobs) => {
      this.jobs = jobs;

      this.selectedJob = jobs[0];

      for (let index = 0; index < this.jobs.length; index++) {
        const job = this.jobs[index];
        
        this.renderImage(job);
        
      }

            
     


    })


  }

  private renderImage(job: Job) {

    if(job?.CompanyLogo)
    this.jobService.getImage(job?.CompanyLogo).subscribe(imgPath => {

      let reader = new FileReader();

      job.CompanyLogo = reader.readAsDataURL(imgPath);

      reader.onload = _event => {
        job.CompanyLogo = reader.result; //image declared earlier
      };

    });

    if(job?.JobImage)
    this.jobService.getImage(job?.JobImage).subscribe(imgPath => {

      let reader = new FileReader();

      job.JobImage = reader.readAsDataURL(imgPath);

      reader.onload = _event => {
        job.JobImage = reader.result;
      };

    });
  }

  onSelect(job: Job): void {


    // this.renderImage(job);
    this.selectedJob  = job;
  }

  // Compose button
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDataExampleDialogComponent, {});

    dialogRef.afterClosed().subscribe((result : any) => {
      console.log(`Dialog result: ${result}`);
    });
  }


  onFileChangeBanner(event : any){ 
  
      for (var i = 0; i < event.target.files.length; i++) { 

        this.companyBanner = event.target.files[i];

           
    }

  }


  onFileChangeLogo(event : any){ 
 
    for (var i = 0; i < event.target.files.length; i++) { 

      this.companyLogo = event.target.files[i];
       
    }

  }



  onPostJob() {

      
    if(this.jobForm.valid) {

      const job : Job = this.jobForm.value;

      this.jobService.saveJob(job).subscribe((result) => {


        if(this.companyBanner){
          const formDataCompanyBanner = new FormData(); 
          formDataCompanyBanner.append("file", this.companyBanner);      
          this.jobService.saveCompanyBanner(result.id, formDataCompanyBanner).subscribe((resultImage : any) => {
          })
        }
  

        if(this.companyLogo) {
          const formDataCompanyLoggo = new FormData(); 
          formDataCompanyLoggo.append("file", this.companyLogo);      
          this.jobService.saveCompanyLogo(result.id, formDataCompanyLoggo).subscribe((resultImage : any) => {
          })

        }

        this.loadJobs();

        this.jobForm.reset();
        this.jobForm.markAsPristine();
        this.companyBanner = null;
        this.companyLogo = null;
        this.editMode = false;


        this.snackBar.open('Job was Successfully Saved', 'Close', {
          duration: 2000,
          horizontalPosition : 'right',
          verticalPosition : 'top'
        });


      })
     
    }

  }



  editJob() {
    this.editMode = true;
    this.jobForm.patchValue(this.selectedJob);
  }


  cancelEdit() {

    this.editMode = false;
    this.jobForm.reset();
    this.jobForm.markAsPristine();
    this.companyBanner = null;
    this.companyLogo = null;

  }


  onSetClose() {

    this.selectedJob.Status = 'Closed';
    this.jobService.saveJob(this.selectedJob).subscribe(data => {
      this.snackBar.open('Job was Successfully Set to Close', 'Close', {
        duration: 2000,
        horizontalPosition : 'right',
        verticalPosition : 'top'
      });

      const job = this.jobs.find(job => job.id == this.selectedJob.id);
      if(job)
        job.Status = 'Closed';

    });

  }


  
  onDelete() {

    this.jobService.deleteJob(this.selectedJob.id).subscribe(data => {
      this.snackBar.open('Job was Successfully Deleted', 'Close', {
        duration: 2000,
        horizontalPosition : 'right',
        verticalPosition : 'top'
      });

      const jobIndex = this.jobs.findIndex(job => job.id == this.selectedJob.id);
      if(jobIndex) {
        this.jobs.splice(jobIndex, 1);
        this.selectedJob = this.jobs[0];
      }

    });

  }


}
