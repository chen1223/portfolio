import { ASSET_PREFIX } from './../../environments/environment.prod';
import { JsonldService } from './../shared/jsonld.service';
import { CssService } from './css.service';
import { Component, OnInit, Renderer2, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MetaService } from '../shared/meta.service';
import { isPlatformBrowser } from '@angular/common';
import { APP_DOMAIN } from '../../environments/environment';

@Component({
  selector: 'app-css-works',
  templateUrl: './css-works.component.html',
  styleUrls: ['./css-works.component.scss'],
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
export class CssWorksComponent implements OnInit {
  assetPrefix = ASSET_PREFIX;
  // JSON LD schema
  schema = {};
  works = [];
  isBrowser: boolean = false;
  constructor(private cssService: CssService,
              private renderer: Renderer2,
              private router: Router,
              private titleService: Title,
              private metaService: MetaService,
              private jsonldService: JsonldService,
              @Inject(PLATFORM_ID) private platformId) {
                this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.getWorks();
    this.titleService.setTitle('CSS Works - Bill Chen');
    this.addMetaTag();
  }

  addMetaTag(): void {
    const title = 'CSS Works - Bill Chen';
    const desc = 'CSS projects of Bill Chen on Codepen';
    this.metaService.addPageMeta(title, desc);
    this.metaService.addFBTag(title, desc, 'website', '', title, APP_DOMAIN + this.router.url);
  }

  getWorks(): void {
    this.cssService.getWorks()
        .subscribe(res => {
          this.works = res;
          this.addJsonLD();
        });
  }

  imgLoadComplete(wrapper: ElementRef) {
    if (this.isBrowser) {
      this.renderer.addClass(wrapper, 'img-loaded');
    }
  }

  addJsonLD(): void {
    this.schema = this.jsonldService.getWorkJSONLD(this.jsonldService.CSS_WORK, this.works);
  }
}
