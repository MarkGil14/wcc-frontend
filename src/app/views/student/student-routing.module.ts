import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";   
import { PendingAccountComponent } from "./pending-account/pending-account.component";
import { StudentListComponent } from "./student-list/student-list.component";
import { StudentViewProfileComponent } from "./student-profile/student-view-profile.component";

export const routes: Routes = [
    {
        path: 'pending',
        component: PendingAccountComponent,
    },      
    {
        path: 'list',
        component: StudentListComponent,
    },
    {
        path: 'view',
        component: StudentViewProfileComponent,
    },

]



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentRoutingModule {
}

