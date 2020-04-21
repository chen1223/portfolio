import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkRoutingModule } from './work-routing.module';
import { WorkMgtComponent } from './work-mgt/work-mgt.component';
import { WorkComponent } from './work-mgt/work/work.component';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';


@NgModule({
  declarations: [
    WorkMgtComponent,
    WorkComponent
  ],
  imports: [
    CommonModule,
    WorkRoutingModule,
    NgxJsonLdModule
  ]
})
export class WorkModule { }
