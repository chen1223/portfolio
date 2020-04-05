import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.regGsapAnimation();
  }

  regGsapAnimation(): void {
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.from('.title', { opacity: 0, y: -100 })
      .from('.desc-wrapper', { opacity: 0, y: -100 })
      .from('.cta', { opacity: 0, x: -100 });
  }
}
