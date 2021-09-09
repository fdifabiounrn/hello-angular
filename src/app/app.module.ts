import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PersonsAdministrationModule} from "./persons-administration/persons-administration.module";
import {PersonModule} from "./person/person.module";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    PersonsAdministrationModule,
    PersonModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
