import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Contact } from 'src/app/apps/contact/contact';
import { Account } from 'src/app/shared/model/account.model';
import { StudentService } from 'src/app/shared/service/student.service';
  

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  searchText: any;
 

  BatchYr = '';


  students : Account[] = [];

  constructor(
      public dialog: MatDialog,
      readonly studentService : StudentService,
      private router: Router
    ) {}
 
  ngOnInit(): void {

    this.filterStudents();
 
    
  }



  filterStudents() {

    let query = '';
     

    if(this.BatchYr != ''){

        query += `&filter=BatchYr||$eq||${this.BatchYr}`;

    }else {


        query = '&limit=20';

    }


    this.studentService.getAlumniFilter(query).subscribe(data => {
        
      for (let index = 0; index < data.length; index++) {
        const student = data[index];

        if(student.profile.Avatar)
            this.studentService.getImage(student.profile.Avatar).subscribe(imgPath => {
            
              let reader = new FileReader();
            
              student.profile.Avatar =  reader.readAsDataURL(imgPath);

              reader.onload = _event => {
                student.profile.Avatar = reader.result; //image declared earlier
              };

            })
        else {
          student.profile.Avatar =  'assets/images/users/default.jpg';

        }


      }

      this.students = data;



    })


  }

    viewStudent(id : any){

        this.router.navigateByUrl(`/app/student/view?id=${id}`)

    }


    exportExcel() {
        
    }

 
}

 
