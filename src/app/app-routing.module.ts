import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginFormComponent} from "./login/login-form/login-form.component";
import {AuthGuard} from "./security/guard/auth.guard";

const routes: Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home', canActivate: [AuthGuard], loadChildren: () =>
      (import('./home/home.module').then(mod => mod.HomeModule))
  },
  {
    path: 'persons', canActivate: [AuthGuard], loadChildren: () =>
      (import('./person/person.module').then(mod => mod.PersonModule))
  },
  {path: 'login', component: LoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
