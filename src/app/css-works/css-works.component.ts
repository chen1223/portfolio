import { CssService } from './css.service';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

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
  works = [];
  constructor(private cssService: CssService,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    this.getWorks();
  }

  getWorks(): void {
    this.cssService.getWorks()
        .subscribe(res => {
          this.works = res;
        });
  }

  imgLoadComplete(wrapper: ElementRef) {
    this.renderer.addClass(wrapper, 'img-loaded');
  }
}
