import { CssRoutingModule } from './css-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CssWorksComponent } from './css-works.component';



@NgModule({
  declarations: [CssWorksComponent],
  imports: [
    CommonModule,
    CssRoutingModule
  ]
})
export class CssWorksModule { }
