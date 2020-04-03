import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
      },
      {
        path: 'works',
        loadChildren: () => import('../work/work.module').then(m => m.WorkModule)
      },
      {
        path: 'css',
        loadChildren: () => import('../css-works/css-works.module').then(m => m.CssWorksModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
