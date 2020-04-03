import { CssService } from './css.service';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-css-works',
  templateUrl: './css-works.component.html',
  styleUrls: ['./css-works.component.scss']
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
