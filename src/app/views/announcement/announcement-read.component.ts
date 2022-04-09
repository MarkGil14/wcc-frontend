import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { map } from "rxjs/operators";
import { Announcement } from "src/app/shared/model/announcement.model";
import { AnnouncementService } from "src/app/shared/service/announcement.service";
import { BaseCustomComponent } from "../custom/base.component";


@Component({
    selector: 'app-announcement-read',
    templateUrl: './announcement-read.component.html'
})
export class AnnouncementReadComponent extends BaseCustomComponent implements OnInit {
   
    constructor( 
        private announcementService : AnnouncementService, 
        readonly route : ActivatedRoute
      ) { 
  
        super()
  
      }


      announcement !: Announcement;



      ngOnInit(): void {
          //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
          //Add 'implements OnInit' to the class.
         


          const filter = this.route.queryParamMap.pipe(
                map((params: ParamMap) => params.get('id')),
            )

            filter.subscribe(id => {
                if(id !== null && id != undefined){
                    this.loadAnnouncement(id);
                }            
            });

          
      }



      loadAnnouncement(id : any) {
        this.announcementService.findOne(id).subscribe(data => {
            this.announcement = data

            for (let i = 0; i < this.announcement.announcement_images.length; i++) {
                const img =  this.announcement.announcement_images[i];
                 
                this.announcementService.getImage(img.ImageUrl).subscribe(imgPath => {
                
                  let reader = new FileReader();
                
                  img.ImageUrl =  reader.readAsDataURL(imgPath);
      
                  reader.onload = _event => {
                    img.ImageUrl = reader.result; //image declared earlier
                  };
      
                })
        
       
              }

        })
      }


      previewContent(content : any) {
        return JSON.parse(content)
      }



 }