import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  isActive: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.isActive = !this.isActive;
  }
}
