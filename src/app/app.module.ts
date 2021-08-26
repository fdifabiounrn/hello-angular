import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PersonsAdministrationModule} from "./persons-administration/persons-administration.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PersonsAdministrationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
