export class Announcement {
 
    id !: any;
  
    Title !: string;
 
    Description !: string;    
 
    Location !: string;    


    Author !: string;    

    DatePublish !: Date;     


    announcement_images !: AnnouncementImages[]

}



export class AnnouncementImages {

    id : any;

    AnnouncementID !: number;

    ImageUrl !: string;

}