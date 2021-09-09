import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Person} from "../../domain/person";
import {PersonService} from "../../person/person.service";

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit {

  persons: Person[] = [];

  displayedColumns: string[] = ['id', 'name', 'age', 'option'];

  constructor(private route: Router,
              private personService: PersonService) {
  }

  ngOnInit(): void {
    this.personService.findAll().subscribe(list => {
      this.persons = list;
    })
  }

  goToDetail(person: Person) {
    this.route.navigate(["detail", person.id])
  }
}
