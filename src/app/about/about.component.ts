import { AboutService } from './about.service';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { faGithub, faCodepen, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
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
}
