import { pluck, take } from 'rxjs/operators';
import { IUser } from './../../shared/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetUsers } from 'src/app/shared/store/action/users.actions';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  users: IUser[] = [];

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getStaticUsers();
  }

  getStaticUsers(): void {
    this.store.dispatch(new GetUsers()).pipe(take(1), pluck('UsersState', 'users')).subscribe(el => {
      this.users = el;
    },
      err => console.log(err)
    );
  }


}
