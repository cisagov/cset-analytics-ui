import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../components/login/login.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //if (this.loginService.isLoggedIn() && sessionStorage.getItem('change_password') === 'true') {
    //  const url: string = route.url.join('');
    //  if (url !== 'user-management') {
    //    this.router.navigateByUrl('/user-management/change-password');
    //    return true;
    //  }
    //}
    if (this.loginService.isLoggedIn()) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;

  }

}
