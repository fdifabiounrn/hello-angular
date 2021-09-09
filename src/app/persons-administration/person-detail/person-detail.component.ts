import {Component, Input, OnInit} from '@angular/core';
import {Person} from "../../domain/person";

@Component({
  selector: 'person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  @Input() person: Person | null = null;

  constructor() {
  }

  ngOnInit(): void {
    console.log("Hook OnInit");
  }


}
