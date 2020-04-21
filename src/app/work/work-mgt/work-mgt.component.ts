import { JsonldService } from './../../shared/jsonld.service';
import { MetaService } from './../../shared/meta.service';
import { APP_DOMAIN } from './../../../environments/environment';
import { WorkService } from './../work.service';
import { Component, OnInit, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-mgt',
  templateUrl: './work-mgt.component.html',
  styleUrls: ['./work-mgt.component.scss'],
  animations: [
    trigger('workList', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-50px)' }),
          stagger('50ms',
            animate('.5s ease-in',
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          )
        ], { optional: true })
      ])
    ])
  ]
})
export class WorkMgtComponent implements OnInit {
  // JSON LD schema
  schema = {};
  works = [];
  isBrowser = false;

  constructor(private renderer: Renderer2,
              private titleService: Title,
              private router: Router,
              private workService: WorkService,
              private metaService: MetaService,
              private jsonldService: JsonldService,
              @Inject(PLATFORM_ID) private platformId) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.titleService.setTitle('My Works - Bill Chen');
    this.addMetaTag();
    this.getWorks();
  }

  addMetaTag(): void {
    const title = 'My Works - Bill Chen';
    const desc = 'Website projects of Bill Chen';
    this.metaService.addPageMeta(title, desc);
    this.metaService.addFBTag(title, desc, 'website', '', title, APP_DOMAIN + this.router.url);
  }

  getWorks(): void {
    this.workService.getAllWorks()
        .subscribe(data => {
          this.works = data;
          this.addJsonLD();
        });
  }

  imgLoadComplete(wrapper: ElementRef) {
    this.renderer.addClass(wrapper, 'img-loaded');
  }

  addJsonLD(): void {
    this.schema = this.jsonldService.getWorkJSONLD(this.jsonldService.WEBSITE_WORK, this.works);
  }
}
