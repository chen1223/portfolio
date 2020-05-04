import { JsonldService } from './../../shared/jsonld.service';
import { Component, OnInit, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { gsap } from 'gsap';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MetaService } from '../../shared/meta.service';
import { isPlatformBrowser } from '@angular/common';
import { APP_DOMAIN } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // JSON LD schema
  schema = {};
  isBrowser = false;
  ctaAnimation;
  constructor(private router: Router,
              private titleService: Title,
              private metaService: MetaService,
              private render: Renderer2,
              private jsonldService: JsonldService,
              @Inject(PLATFORM_ID) private platformId) {
      this.isBrowser = isPlatformBrowser(this.platformId);
}

  ngOnInit(): void {
    if (this.isBrowser) {
      this.regGsapAnimation();
    }
    this.addMetaTag();
    this.addJsonLD();
    this.titleService.setTitle('Bill Chen | Fullstack Developer');
  }

  addMetaTag(): void {
    const title = 'Bill Chen | Fullstack Developer';
    const desc = 'I build professional websites and bring ideas to life.';
    this.metaService.addPageMeta(title, desc);
    this.metaService.addFBTag(title, desc, 'website', '', title, APP_DOMAIN + this.router.url);
  }

  regGsapAnimation(): void {
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.from('.title', { opacity: 0, y: -100 })
      .from('.desc-wrapper', { opacity: 0, y: -100 })
      .from('.cta', { ease: 'none', opacity: 0, x: -100, duration: .45 });
  }

  addJsonLD(): void {
    this.schema = this.jsonldService.getHomeJSONLD();
  }

  // Navigate to works page
  navToWorks(): void {
    this.router.navigateByUrl('/works');
  }

  onBtnClick(e) {
    e.preventDefault();
    this.render.addClass(e.target, 'leave');
    setTimeout(() => {
      this.navToWorks();
    }, 500);
  }
}
