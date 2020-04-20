import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

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
    this.isHomePage = this.router.url.indexOf('work') < 0 &&
                      this.router.url.indexOf('css') < 0 &&
                      this.router.url.indexOf('about') < 0;
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
