import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Person} from "../../domain/person";
import {PersonService} from "../../person/person.service";

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css']
})
export class PersonInfoComponent implements OnInit {

  formPerson: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(4)]],
    lastName: ['', [Validators.required, Validators.minLength(4)]],
    age: ['', [Validators.required, Validators.min(1), Validators.max(90)]],
  })

  constructor(private router: ActivatedRoute,
              private fb: FormBuilder,
              private personService: PersonService) {
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(param => {
      let p = param.get("id");
      if (p != null) {
        let id = parseInt(p);
        this.personService.findOne(id).subscribe(p => {
          this.buildForm(p);
        })
      }
    })
  }

  buildForm(person: Person | null) {
    if (person != null) {
      this.formPerson.patchValue({
        id: person.id,
        name: person.firstName,
        lastName: person.lastName,
        age: person.age,
      })
    }
  }

  get fc() {
    return this.formPerson.controls;
  }
}
