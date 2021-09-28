import { Component } from '@angular/core';
import {AuthenticationService} from "./security/service/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Curso de angular';

  public isExpanded = false;


  constructor(public authenticationService: AuthenticationService) {
  }

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}
