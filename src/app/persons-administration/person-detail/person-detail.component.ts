import {Component, OnInit} from '@angular/core';
import {Person} from "../../domain/person";

@Component({
  selector: 'person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  persons: Person[] = [
    new Person("Federico", "Difabio", 27),
    new Person("Juan", "Lala", 17),
    new Person("Octa", "Linares", 24),
  ];
  personSelected: Person | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }

  selectPerson(p: Person): void {
    this.personSelected = p;
  }

}
