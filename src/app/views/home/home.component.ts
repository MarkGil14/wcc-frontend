import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Account } from 'src/app/shared/model/account.model';
import { StudentService } from 'src/app/shared/service/student.service';
import { BaseCustomComponent } from '../custom/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseCustomComponent implements OnInit {


  
  slides = [
    {
      'image' : "assets/wcc/images/bg2.jpg"
    },
    {
        'image' : "assets/wcc/images/grad.jpeg"
    },
    {
        'image' : "assets/wcc/images/bg3.jpg"
    },
  ]

  
  BatchYr = '';

  searchText: any;
 
  students : Account[] = [];


  constructor(
    public dialog: MatDialog,
    readonly studentService : StudentService,
    private router: Router
  ) {

    super();

  }

  
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
        
        this.students = data;
        console.log(this.students)
    })


  }

}
