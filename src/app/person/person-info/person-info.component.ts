import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Person} from "../../domain/person";
import {PersonService} from "../../person/person.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css']
})
export class PersonInfoComponent implements OnInit {

  formPerson: FormGroup = this.fb.group({
    id: ['', []],
    name: ['', [Validators.required, Validators.minLength(4)]],
    lastName: ['', [Validators.required, Validators.minLength(4)]],
    age: ['', [Validators.required, Validators.min(1), Validators.max(90)]],
  })

  loading: boolean = false;

  constructor(private router: ActivatedRoute,
              private fb: FormBuilder,
              private personService: PersonService,
              private route: Router,
              private snackBar: MatSnackBar,
              private location: Location) {
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(param => {
      let p = param.get("id");
      this.loading = true;
      if (p != null) {
        let id = parseInt(p);
        this.personService.findOne(id).subscribe(p => {
          this.buildForm(p);
          this.loading = false;
        }, error => {
          this.loading = false;
          this.snackBar.open(error, "Error", {duration: 2000});
          this.goToBack();
        })
      } else {
        this.loading = false;
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

  goToBack() {
    this.location.back();
  }

  goToList() {
    this.route.navigate(["persons", 'list']);
  }

  save() {
    const person = new Person(
      this.formPerson.get(["id"])?.value,
      this.formPerson.get(["name"])?.value,
      this.formPerson.get(["lastName"])?.value,
      +this.formPerson.get(["age"])?.value);

    this.loading = true;
    if (person.id == null) {
      //CREATE
      this.personService.create(person).subscribe(p => {
        this.snackBar.open("La persona se creo con exito",
          "Éxito", {duration: 2000});
        this.goToList();
      }, error => {
        this.loading = false;
        this.snackBar.open(error, "Error", {duration: 2000})
      })
    } else {
      //UPDATE
      this.personService.update(person).subscribe(p => {
        this.snackBar.open("La persona se actualizo con exito",
          "Éxito", {duration: 2000});
        this.goToList();
      }, error => {
        this.loading = false;
        this.snackBar.open(error, "Error", {duration: 2000})
      })
    }
  }
}
