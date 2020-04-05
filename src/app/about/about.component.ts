import { AboutService } from './about.service';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { faGithub, faCodepen, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate, stagger, query, keyframes, animateChild } from '@angular/animations';
import { gsap } from 'gsap';

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

  skills = [];
  constructor(private renderer: Renderer2,
              private aboutService: AboutService) { }

  ngOnInit(): void {
    this.regGsapAnimation();
    this.loadSkills();
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
