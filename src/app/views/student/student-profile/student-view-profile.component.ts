import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { Account } from 'src/app/shared/model/account.model';
import { JobProfile } from 'src/app/shared/model/job-profile.model';
import { Profile } from 'src/app/shared/model/profile.model';
import { StudentService } from 'src/app/shared/service/student.service';
import { BaseCustomComponent } from '../../custom/base.component';
 
@Component({
  selector: 'app-student-view-profile',
  templateUrl: './student-view-profile.component.html',
})
export class StudentViewProfileComponent  extends BaseCustomComponent  implements OnInit {


  student !: Account;

  studentProfile !: Profile;

  studentJobProfile !: JobProfile;

  constructor(

    private route: ActivatedRoute,
    readonly studentService : StudentService

  ) {
    super()     
   }

  ngOnInit(): void {


    const filter = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('id')),
    )

    filter.subscribe(id => {
      console.log(id);

        if(id !== null && id != undefined){
            this.loadStudent(id)
        }
            
      });

  }



  loadStudent(id : any) {
      let query = `&filter=id||$eq||${id}&limit=1`;
      this.studentService.getAlumniFilter(query).subscribe((students) => {
        this.student = students[0];


        if(this.student.profile)
          this.studentProfile = this.student?.profile;

        if(this.student.profile?.job_profiles)
            this.studentJobProfile = this.student?.profile?.job_profiles[0];



      })
  }



}
