import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService : AuthService, private router : Router){}

  canActivate(destination : ActivatedRouteSnapshot, state : RouterStateSnapshot): boolean {
    const url = state.url;
    const isAuthenticated = this.authService.isAuthenticated();

    if(url === '/sign-in' || url === '/sign-up'){
      if(!isAuthenticated){
        return true;
      }

      this.router.navigate(['/home']);
      return false;
    }

    if(!isAuthenticated){
      this.router.navigate(['/sign-in']);
      return false;
    }

    return true;
  }
}
