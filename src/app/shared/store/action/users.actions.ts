import { IUser } from './../../interfaces/user.interface';

export class GetUsers {
    static readonly desc = 'get users';
    static readonly type = '[GetUsers] get users';
}

export class CreateUser {
    static readonly desc = 'create user';
    static readonly type = '[CreateUser] create user';
    constructor(public readonly payload: IUser) {}
}

export class Update {
    static readonly desc = 'update user';
    public static readonly type = '[Users] Update';
    constructor(public readonly user: IUser) { }
}

export class DeleteUser {
    static readonly desc = 'delete user';
    public static readonly type = '[Users] Delete';
    constructor(public readonly id: number) { }
}
export class GetOneUser {
    static readonly desc = 'get one user';
    public static readonly type = '[Users] get one user';
    constructor(public readonly id: number) { }
}