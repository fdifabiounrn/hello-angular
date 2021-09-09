import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { PersonInfoComponent } from './person-info/person-info.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PersonService} from "./person.service";
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [
    PersonsListComponent,
    PersonInfoComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    PersonRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [PersonService]
})
export class PersonModule { }
