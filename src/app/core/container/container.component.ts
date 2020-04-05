import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { trigger, transition, query, style, animate, group, animateChild } from '@angular/animations';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  isActive = false;
  isHomePage = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isHomePage = this.router.url === '/';
    this.registerRouteChange();
  }

  registerRouteChange() {
    this.router.events.subscribe((route: NavigationEnd) => {
      this.isHomePage = route.urlAfterRedirects === '/';
    });
  }

  toggleMenu() {
    this.isActive = !this.isActive;
  }

}
