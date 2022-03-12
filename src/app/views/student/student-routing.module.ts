import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";   
import { PendingAccountComponent } from "./pending-account/pending-account.component";
import { StudentListComponent } from "./student-list/student-list.component";

export const routes: Routes = [
    {
        path: 'pending',
        component: PendingAccountComponent,
    },      
    {
        path: 'list',
        component: StudentListComponent,
    },

]



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentRoutingModule {
}

