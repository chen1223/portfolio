import { JsonldService } from './../shared/jsonld.service';
import { AboutService } from './about.service';
import { Component, OnInit, Renderer2, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { faGithub, faCodepen, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';
import { gsap } from 'gsap';
import { Title } from '@angular/platform-browser';
import { MetaService } from '../shared/meta.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { APP_DOMAIN } from '../../environments/environment';

// tslint:disable-next-line: max-line-length
const desc = 'Bill Chen is a web developer who is passionate about learning technologies of the web in all fields including Frontend, Backend and Infrastructure.';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('skillList', [
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
export class AboutComponent implements OnInit {
  // JSON LD schema
  schema = {};
  gitIcon = faGithub;
  codepenIcon = faCodepen;
  linkedInIcon = faLinkedin;
  plusIcon = faPlusCircle;
  minusIcon = faMinusCircle;
  isBrowser: boolean = false;

  skills = [];
  constructor(private renderer: Renderer2,
              private aboutService: AboutService,
              private router: Router,
              private titleService: Title,
              private metaService: MetaService,
              private jsonLDService: JsonldService,
              @Inject(PLATFORM_ID) private platformId) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.regGsapAnimation();
    }
    this.addMetaTag();
    this.addJsonLD();
    this.titleService.setTitle('About Bill Chen');
    this.loadSkills();
  }

  addMetaTag(): void {
    const title = 'About Bill Chen';
    // tslint:disable-next-line: max-line-length
    this.metaService.addPageMeta(title, desc);
    this.metaService.addFBTag(title, desc, 'website', '', title, APP_DOMAIN + this.router.url);
  }

  imgLoadComplete(wrapper: ElementRef) {
    this.renderer.addClass(wrapper, 'img-loaded');
  }

  loadSkills(): void {
    this.aboutService.loadSkills()
        .subscribe(skills => {
          this.skills = skills;
        });
  }

  // Expand skill card
  expand(card: ElementRef) {
    this.renderer.removeClass(card, 'closed');
    this.renderer.addClass(card, 'opened');
  }
  // Collapse skill card
  collapse(card: ElementRef) {
    this.renderer.removeClass(card, 'opened');
    this.renderer.addClass(card, 'closed');
  }

  // Animations
  regGsapAnimation(): void {
    const tl = gsap.timeline({ default: { duration: 1 } });
    // Summary section + email
    tl.from('.anim-group1', { opacity: 0, y: -100 })
      // Social links section
      .from('.social-links', { opacity: 0, x: -100 }, '+=0.4');
  }

  addJsonLD(): void {
    const profilePic = `${APP_DOMAIN}/assets/img/profile.jpg`;
    this.schema = this.jsonLDService.getAboutJSONLD(profilePic, desc, 'chen1223@bu.edu', 'https://www.linkedin.com/in/han-wei-chen/');
  }
}
