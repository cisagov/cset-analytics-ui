import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Login } from "../../models/login.model";
import * as moment from "moment";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { share } from "rxjs/operators";
import { ConfigService } from "../../services/config.service";

@Injectable()
export class LoginService {
  apiUrl: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    public configSvc: ConfigService
  ) {
    this.apiUrl = configSvc.apiUrl;
  }

  public postLogin(login: Login): Observable<any> {
    return this.http
      .post(this.apiUrl + "auth/signin", login)
      .pipe(share());
  }

  public logout() {
    sessionStorage.removeItem("id_token");
    sessionStorage.removeItem("expires_at");
    sessionStorage.removeItem("username");
    this.router.navigateByUrl("/login")
  }

  public setSession(authResult) {
    sessionStorage.setItem("id_token", authResult.id_token);
    sessionStorage.setItem("expires_at", authResult.expires_at);
    sessionStorage.setItem("username", authResult.username);
    this.router.navigateByUrl("/");
  }

  public isLoggedIn() {
    if (sessionStorage.getItem("id_token") != null) {
      return moment().isBefore(this.getExpiration());
    }
    return false;
  }

  private getExpiration() {
    if (sessionStorage.getItem("expires_at") == null) {
      return null;
    }
    const expiration = sessionStorage.getItem("expires_at");
    return moment(expiration);
  }

  public logUserLogout() {
    return this.http.get<any>("/api/Login/logUserLogout/").pipe();
  }
}
