import { WorkComponent } from './work-mgt/work/work.component';
import { WorkMgtComponent } from './work-mgt/work-mgt.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WorkMgtComponent
  },
  {
    path: ':id',
    component: WorkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkRoutingModule { }
