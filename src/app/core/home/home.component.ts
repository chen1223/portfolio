import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
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
  isBrowser: boolean = false;
  constructor(private router: Router,
              private titleService: Title,
              private metaService: MetaService,
              @Inject(PLATFORM_ID) private platformId) {
      this.isBrowser = isPlatformBrowser(this.platformId);
}

  ngOnInit(): void {
    this.regGsapAnimation();
    this.addMetaTag();
    this.titleService.setTitle('Bill Chen | Fullstack Developer');
  }

  addMetaTag(): void {
    const title = 'Bill Chen | Fullstack Developer';
    const desc = 'I build professional websites and bring ideas to life.';
    this.metaService.addPageMeta(title, desc);
    this.metaService.addFBTag(title, desc, 'website', 'assets/img/profile.jpg', title, APP_DOMAIN + this.router.url);
  }

  regGsapAnimation(): void {
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.from('.title', { opacity: 0, y: -100 })
      .from('.desc-wrapper', { opacity: 0, y: -100 })
      .from('.cta', { opacity: 0, x: -100 });
  }
}
