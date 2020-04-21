import { CssRoutingModule } from './css-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CssWorksComponent } from './css-works.component';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';



@NgModule({
  declarations: [CssWorksComponent],
  imports: [
    CommonModule,
    CssRoutingModule,
    NgxJsonLdModule
  ]
})
export class CssWorksModule { }
