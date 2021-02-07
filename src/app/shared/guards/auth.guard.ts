import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLocalUser()
  }

  checkLocalUser(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      this.router.navigateByUrl('main');
      return false;
    }
  }

}
