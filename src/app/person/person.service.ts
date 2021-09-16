import {Injectable} from '@angular/core';
import {Person} from "../domain/person";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private resourceUrl: string = environment.backendUrl + "persons";
  private resourceUrlHC: string = "http://tesis.lia.unrn.edu.ar:3000/persons"

  headers = new HttpHeaders(
    {Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZkaWZhYmlvQHVucm4uZWR1LmFyIiwic3ViIjoyNCwiaWF0IjoxNjMxMDIxMzA0LCJleHAiOjE2MzEwMjIyMDR9.RNycdHCX6-iQOhwZ8M-r7Yevb_81EIDkJxbucOtup_0`}
  );

  constructor(private httpClient: HttpClient) {
  }

  public findAll(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.resourceUrl, {headers: this.headers}).pipe(
      map(persons =>
        persons.map(p => new Person(p.id, p.firstName, p.lastName, p.age))
      )
    )
  }

  public findOne(id: number): Observable<Person | null> {
    return this.httpClient.get<Person>(this.resourceUrl + "/" + id, {headers: this.headers}).pipe(
      catchError(err => {
        console.log("Error")
        return throwError("La persona no existe.");
      }),
      map(p => new Person(p.id, p.firstName, p.lastName, p.age))
    )
  }

  public create(person: Person): Observable<any> {
    return this.httpClient.post<any>(this.resourceUrl, person, {headers: this.headers}).pipe(
      catchError(err => {
        console.log("Error " + err);
        return throwError("La persona no pudo ser creada.");
      })
    )
  }

  public update(person: Person): Observable<any> {
    return this.httpClient.put<any>(this.resourceUrl, person, {headers: this.headers}).pipe(
      catchError(err => {
        return throwError("La persona no pudo ser actualizada.")
      })
    )
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.resourceUrl + "/" + id, {headers: this.headers}).pipe(
      catchError(err => {
        return throwError("La persona contiene informacion asociada.")
      })
    )
  }
}

