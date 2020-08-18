import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { share } from "rxjs/operators";
import { RegisterUser } from 'src/app/models/register-user.model';
import { ConfigService } from '../../services/config.service';

@Injectable()

export class UserManagementService {

  apiUrl: string;
  constructor(private http: HttpClient, private router: Router, public configSvc: ConfigService) {
    this.apiUrl = configSvc.apiUrl;
  }

  public postCreateUser(user: RegisterUser): Observable<any> {
    return this.http.post(this.apiUrl + 'user/createuser',user).pipe(share());
  }
}
