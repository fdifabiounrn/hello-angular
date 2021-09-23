import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PersonsAdministrationModule} from "./persons-administration/persons-administration.module";
import {PersonModule} from "./person/person.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SidenavComponent } from './sidenav/sidenav.component';
import {AuthenticationService} from "./security/service/authentication.service";
import { LoginFormComponent } from './login/login-form/login-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TokenInterceptor} from "./security/interceptor/token-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    PersonsAdministrationModule,
    PersonModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
