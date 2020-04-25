import { ASSET_PREFIX } from './../../../../environments/environment';
import { JsonldService } from './../../../shared/jsonld.service';
import { WorkService } from './../../work.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Renderer2, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import * as moment from 'moment';
import { trigger, transition, style, animate, state, query, stagger } from '@angular/animations';
import { gsap } from 'gsap';
import { Title } from '@angular/platform-browser';
import { MetaService } from './../../../shared/meta.service';
import { APP_DOMAIN } from '../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

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
  assetPrefix = ASSET_PREFIX;
  // JSON LD schema
  schema = {};
  workID;
  workData;
  isBrowser: boolean = false;

  constructor(private renderer: Renderer2,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private workService: WorkService,
              private titleService: Title,
              private metaService: MetaService,
              private jsonldService: JsonldService,
              @Inject(PLATFORM_ID) private platformId) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      window.scrollTo(0, 0);
      this.regGsapAnimation();
    }
    this.setUpRoute();
  }

  addMetaTag(): void {
    const title = `${this.workData.title} - Bill Chen`;
    const desc = this.workData.desc[0];
    const img = this.workData.imgs.desktop;
    this.metaService.addPageMeta(title, desc);
    this.metaService.addFBTag(title, desc, 'website', img, title, APP_DOMAIN + this.router.url);
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
          this.titleService.setTitle(`${this.workData.title} - Bill Chen`);
          this.addMetaTag();
          this.addJsonLD();
        });
  }

  imgLoadComplete(el: ElementRef) {
    if (this.isBrowser) {
      this.renderer.addClass(el, 'loaded');
    }
  }

  regGsapAnimation(): void {
    if (this.isBrowser) {
      const tl = gsap.timeline({ defaults: { duration: 1} });
      tl.from('.btn-container', { opacity: 0, x: 100 }, '+=.5');
    }
  }

  addJsonLD(): void {
    this.schema = this.jsonldService.getSingleWorkJSONLD(this.workData);
  }
}
