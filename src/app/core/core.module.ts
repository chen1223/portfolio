import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreRoutingModule } from './core-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    ContainerComponent,
    SidenavComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
