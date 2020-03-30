import { WorkService } from './../work.service';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-work-mgt',
  templateUrl: './work-mgt.component.html',
  styleUrls: ['./work-mgt.component.scss']
})
export class WorkMgtComponent implements OnInit {
  works = [];

  constructor(private renderer: Renderer2, private workService: WorkService) { }

  ngOnInit(): void {
    this.getWorks();
  }

  getWorks(): void {
    this.works = this.workService.getAllWorks();
  }

  imgLoadComplete(wrapper: ElementRef) {
    this.renderer.addClass(wrapper, 'img-loaded');
  }
}
