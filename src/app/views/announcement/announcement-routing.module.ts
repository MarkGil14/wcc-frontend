import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnnouncementReadComponent } from "./announcement-read.component";
import { AnnouncementComponent } from "./announcement.component";
 

export const routes: Routes = [
  
  {
    path: '',
    component: AnnouncementComponent,
 
  },
  
  {
    path: 'read',
    component: AnnouncementReadComponent, 
  },

]



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnnouncementRoutingModule {
}

