import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MailService } from 'src/app/apps/mail/mail.service';
import { Message } from 'src/app/apps/mail/message';


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
export class JobComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 960px)`);

  public config: PerfectScrollbarConfigInterface = {};

  displayMode = 'default';

  messages: Message[] = [];
  selectedMessage: Message = Object.create(null);
  messageOpen = false;
  sidePanelOpened = true;

  constructor(private mailService: MailService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getMessages();
  }

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }

  getMessages(): void {
    this.mailService.getMessages().then((messages: any) => {
      this.messages = messages;
      this.selectedMessage = this.messages[1];
    });
  }

  onSelect(message: Message): void {
    this.selectedMessage = message;
  }

  // Compose button
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDataExampleDialogComponent, {});

    dialogRef.afterClosed().subscribe((result : any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
