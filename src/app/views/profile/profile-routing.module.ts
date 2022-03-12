import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminProfileComponent } from "./admin-profile.component";
import { ProfileComponent } from "./profile.component";
 

export const routes: Routes = [
  
  {
    path: '',
    component: ProfileComponent, 
  },
  {
    path: 'admin-profile',
    component: AdminProfileComponent, 
  },

]



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {
}

