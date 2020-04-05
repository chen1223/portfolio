import { WorkService } from './../../work.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { trigger, transition, style, animate, state, query, stagger } from '@angular/animations';
import { gsap } from 'gsap';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  animations: [
    trigger('slideDown', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-20px)'
        }),
        animate(300)
      ])
    ]),
    trigger('slideLeftList', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(50px)' }),
          stagger('50ms',
            animate('.5s .5s ease-in',
              style({ opacity: 1, transform: 'translateX(0)' })
            )
          )
        ], { optional: true })
      ])
    ])
  ]
})
export class WorkComponent implements OnInit {

  workID;
  workData;

  constructor(private renderer: Renderer2,
              private activatedRoute: ActivatedRoute,
              private workService: WorkService) { }

  ngOnInit(): void {
    this.setUpRoute();
    this.regGsapAnimation();
  }

  // Set up route
  setUpRoute() {
    this.workID = this.activatedRoute.snapshot.url[0].path;
    this.getWorkData();
  }

  // Get work data
  getWorkData() {
    this.workService.getWork(this.workID)
        .subscribe(data => {
          this.workData = data;
          this.workData.date = moment(this.workData.date, 'YYYY-MM').format('MMMM YYYY');
        });
  }

  imgLoadComplete(el: ElementRef) {
    this.renderer.addClass(el, 'loaded');
  }

  regGsapAnimation(): void {
    const tl = gsap.timeline({ defaults: { duration: 1} });
    tl.from('.btn-container', { opacity: 0, x: 100 }, '+=.5');
  }
}
