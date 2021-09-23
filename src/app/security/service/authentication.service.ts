import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private resourceUrl: string = environment.backendUrl + "login";
  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  get loggedIn(): Observable<boolean> {
    return this._loggedIn.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    const login = {
      username: username,
      password: password
    }
    return this.httpClient.post<any>(this.resourceUrl, login).pipe(
      catchError(err => {
        console.log("Error " + err);
        return throwError("Usuario y/o contraseña invalida");
      }),
      tap(resp => {
        console.log("JWT " + resp.token);
        localStorage.setItem(environment.tokenName, resp.token);
        this._loggedIn.next(true);
      })
    )
  }

  logout() {
    this._loggedIn.next(false);
    localStorage.removeItem(environment.tokenName);
    return this.router.navigate(['login']);
  }

  get token(): string | null {
    return localStorage.getItem(environment.tokenName);
  }

  isLoggedIn(): boolean {
    const token = this.token;
    return token !== null;
  }
}
