import { CreateUser, DeleteUser, GetOneUser } from './../action/users.actions';
import { catchError, filter, map, take, tap } from 'rxjs/operators';
import { IUser } from './../../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { GetUsers, Update } from '../action/users.actions';
import { AuthService } from '../../services/auth.service';





export namespace User {
    export interface usersStateModel {
        users: IUser[];
        userDetails: IUser;
    }
}



@State<User.usersStateModel>({
    name: 'UsersState',
    defaults: {
        users: [],
        userDetails: null
    }
})

@Injectable()
export class UsersState {
    @Selector()
    static users({ users }: User.usersStateModel) {
        return users;
    }

    constructor(private authService: AuthService) { }

    @Action(GetUsers)
    getUsers({ patchState }: StateContext<User.usersStateModel>) {
        return this.authService.getJSONUsers().pipe(tap(users => patchState({ users })));
    }

    @Action(DeleteUser)
    deleteUser({ getState, patchState }: StateContext<User.usersStateModel>, { id }: DeleteUser) {
        return this.authService.deleteJSONUser(id)
            .pipe(tap(() => {
                const state = getState();
                patchState({
                    users: state.users.filter(item => item.id !== id)
                });
            }));
    }


    @Action(Update)
    updateUser({ getState, patchState }: StateContext<User.usersStateModel>, { user }: Update) {
        return this.authService.updateJSONUser(user).pipe(tap(result => {
            patchState({
                users: [...getState().users, result]
            });
        }));
    }

    @Action(CreateUser)
    createUser({ patchState, getState }: StateContext<User.usersStateModel>, { payload }: CreateUser) {
        return this.authService.registration(payload).pipe(tap(
            data => {
                patchState({
                    users: [...getState().users, data]
                });
            }
        ));

    }

    @Action(GetOneUser)
    getOneUser({ patchState }: StateContext<User.usersStateModel>, { id }: GetOneUser) {
        return this.authService.getJSONOneUser(+id).pipe(tap(
            userDetails => {
                patchState({
                    userDetails
                });
            }
        ));
    }
}