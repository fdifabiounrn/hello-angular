import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home', loadChildren: () =>
      (import('./home/home.module').then(mod => mod.HomeModule))
  },
  {
    path: 'persons', loadChildren: () =>
      (import('./person/person.module').then(mod => mod.PersonModule))
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
