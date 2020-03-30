import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() OnItemClick = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  menuClick(): void {
    this.OnItemClick.next();
  }
}
