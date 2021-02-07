import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './../interfaces/user.interface';
import { Observable, Subject } from 'rxjs';
import {  take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: IUser[] = [];
  url = 'http://localhost:3000/users';
  userStatusChanges = new Subject<boolean>();

  constructor(private http: HttpClient, private route: Router, private toastr: ToastrService) { }

  getJSONUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(this.url);
  }

  getJSONOneUser(id:number): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/${id}`);
  }

  registration(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.url, user);
  }

  signIn(email: string, password: string): any {
    return this.http.get<any>(this.url).pipe(take(1)).subscribe(
      data => {
        const USER: IUser = data.find(el => el.email === email && el.password === password);
        if (USER) {
          localStorage.setItem('user', JSON.stringify(USER));
          this.route.navigateByUrl('profile/user-profile');
          this.toastr.success('Success', 'Great!!!');
          this.userStatusChanges.next(true);
        } else {
          alert('User not defined');
          this.toastr.error('Error', 'User not defined');
        }
      },
      err => console.log(err)
    );
  }

  deleteJSONUser(id: number): Observable<IUser> {
    return this.http.delete<IUser>(`${this.url}/${id}`)
  }

  updateJSONUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.url}/${user.id}`, user);
  }
  signOut(): void {
    localStorage.removeItem('user')
    this.userStatusChanges.next(true)
    this.route.navigateByUrl('/main')
  }

}
