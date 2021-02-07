import { UsersState } from 'src/app/shared/store/state/users.state';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { GetOneUser } from './../../shared/store/action/users.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Location } from '@angular/common';
import { pluck, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: IUser;
  constructor(
    private activRoute: ActivatedRoute,
    public location: Location,
  ) { }

  ngOnInit(): void {
    this.getJsonUser();
  }

  getJsonUser(): void {
    this.activRoute.data.pipe(take(1)).subscribe(
      data => this.user = data.UserResolver.UsersState.userDetails
    )
  }

}
