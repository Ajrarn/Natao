import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigComponent } from './config/config.component';

const routes: Routes = [
  {
    path: 'config',
    component: ConfigComponent
  },
  {
    path:  '',
    redirectTo: 'config',
    pathMatch:  'full'
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

