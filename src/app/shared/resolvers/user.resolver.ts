import { GetOneUser } from './../store/action/users.actions';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { pluck, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<any> {
  constructor(private store: Store) { }
  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.dispatch(new GetOneUser(+route.paramMap.get('id')));
  }
}
