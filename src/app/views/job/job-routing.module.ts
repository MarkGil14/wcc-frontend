import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { JobComponent } from "./job.component";
 

export const routes: Routes = [
  
  {
    path: '',
    component: JobComponent,
    data : {
        title : 'Job'
    }
  },

]



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobRoutingModule {
}

