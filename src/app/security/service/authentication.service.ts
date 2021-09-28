import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../../domain/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private resourceUrl: string = environment.backendUrl + "login";
  private _loggedIn: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  get loggedIn(): Observable<User | null> {
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
        localStorage.setItem(environment.tokenName, resp.token);
        let decodeToken = this.jwtHelper.decodeToken(resp.token);
        let user: User = new User(decodeToken.username);
        this._loggedIn.next(user);
      })
    )
  }

  logout() {
    this._loggedIn.next(null);
    localStorage.removeItem(environment.tokenName);
    return this.router.navigate(['login']);
  }

  get token(): string | null {
    return localStorage.getItem(environment.tokenName);
  }

  isLoggedIn(): boolean {
    const token = this.token;
    if (token !== null && !this.jwtHelper.isTokenExpired(token)) {
      if (this._loggedIn.value === null) {
        let user: User = new User(this.jwtHelper.decodeToken(token));
        this._loggedIn.next(user);
      }
      return true;
    }
    return false;
  }
}
