import { WorkService } from './../work.service';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

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
  works = [];

  constructor(private renderer: Renderer2, private workService: WorkService) { }

  ngOnInit(): void {
    this.getWorks();
  }

  getWorks(): void {
    this.workService.getAllWorks()
        .subscribe(data => {
          this.works = data;
        });
  }

  imgLoadComplete(wrapper: ElementRef) {
    this.renderer.addClass(wrapper, 'img-loaded');
  }
}
