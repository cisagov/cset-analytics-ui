import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { LoginService } from '../../login/login.service';
import { UserAuthService } from '../../../services/user-auth.service'
import { Router } from '@angular/router';

@Component({
  selector: "app-layout-main",
  templateUrl: "./layout-main.component.html",
  styleUrls: ["./layout-main.component.scss"],
})
export class LayoutMainComponent implements OnInit {
  username: string = "";

  constructor(
    public loginSvc:LoginService, 
    private _router: Router,
    private userAuthSvc: UserAuthService) {
      this.userAuthSvc.getUserNameBehaviorSubject().subscribe((value) => {
        this.username = value;
      });
  }

  @ViewChild("drawer", { static: false })
  drawer: MatSidenav;
  
  logout(){
    this.loginSvc.logout();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("username")) {
      this.username = sessionStorage.getItem("username");
    }
  }
}
