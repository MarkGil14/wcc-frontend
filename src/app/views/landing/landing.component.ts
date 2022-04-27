import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: []
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

 
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  images = [
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

  
}
