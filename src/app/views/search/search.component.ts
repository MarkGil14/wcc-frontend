import { Component, OnInit } from "@angular/core";
import { BaseCustomComponent } from "../custom/base.component";


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
})
export class SearchComponent extends BaseCustomComponent implements OnInit {

    ngOnInit(): void {
        
    }

}
