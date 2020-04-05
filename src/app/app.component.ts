import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, query, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';
}
