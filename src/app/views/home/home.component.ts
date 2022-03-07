import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  
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

  

  constructor() { }

  ngOnInit(): void {
  }



}
