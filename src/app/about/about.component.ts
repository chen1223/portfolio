import { AboutService } from './about.service';
import { Component, OnInit, Renderer2, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { faGithub, faCodepen, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate, stagger, query, keyframes, animateChild } from '@angular/animations';
import { gsap } from 'gsap';
import { Title } from '@angular/platform-browser';
import { MetaService } from '../shared/meta.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { APP_DOMAIN } from '../../environments/environment';

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
              @Inject(PLATFORM_ID) private platformId) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.addMetaTag();
    this.titleService.setTitle('About Bill Chen');
    this.regGsapAnimation();
    this.loadSkills();
  }

  addMetaTag(): void {
    const title = 'About Bill Chen';
    const desc = 'Bill Chen is a web developer who is passionate about learning technologies of the web in all fields including Frontend, Backend and Infrastructure.';
    this.metaService.addPageMeta(title, desc);
    this.metaService.addFBTag(title, desc, 'website', 'assets/img/profile.jpg', title, APP_DOMAIN + this.router.url);
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
}
