import {Component, OnInit} from '@angular/core';
import {Person} from "../../domain/person";
import {PersonService} from "../person.service";

@Component({
  selector: 'person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  persons: Person[] = [];
  personSelected: Person | null = null;

  constructor(private personService: PersonService) {
  }

  ngOnInit(): void {
    this.personService.findAll()
      .subscribe(list =>
        this.persons = list);
  }

  selectPerson(p: Person): void {
    this.personSelected = p;
  }

}
