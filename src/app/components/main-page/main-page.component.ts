import { Store } from '@ngxs/store';
import { GetUsers, Update, DeleteUser } from './../../shared/store/action/users.actions';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { IUser, IAddress } from './../../shared/interfaces/user.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pluck, take } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  users: IUser[] = [];
  addressOfUsers: IAddress[] = [];
  editForm: FormGroup;
  editAddresForm: FormGroup;
  modalRef: BsModalRef;
  user: IUser;
  searchField: string;
  userIndex: number;
  addressIndex: number;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.formBild();
    this.getStaticUsers();
  }

  editAddress(address:IAddress, index: number, user:IUser): void {
    this.editAddresForm.patchValue(address);
    this.addressIndex = index;
    this.userIndex = this.users.findIndex(el => el.id === user.id);
  }

  saveAddress(): void {
    this.users[this.userIndex].address.splice(this.addressIndex, 1, this.editAddresForm.value);
    this.store.dispatch(new Update(this.users[this.userIndex])).subscribe(
      () => {
        this.getStaticUsers();
      }
    )
  }

  // deleteAddress( index: number, user:IUser):void{
  //   this.addressIndex = index;
  //   this.userIndex = this.users.findIndex(el => el.id === user.id);
  //   this.users[this.userIndex].address.slice(this.addressIndex, 1);
  //   this.store.dispatch(new Update(this.users[this.userIndex])).subscribe(
  //     () => {
  //       this.getStaticUsers();
  //     }
  //   )
  // }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getStaticUsers(): void {
    this.store.dispatch(new GetUsers()).pipe(take(1), pluck('UsersState', 'users')).subscribe(el => {
      this.users = el;
    },
      err => console.log
    );
  }

  formBild(): void {
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required]],
    });
    this.editAddresForm = this.formBuilder.group({
      addressType: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
    })
  }

  deleteUser(user: IUser): void {
    this.store.dispatch(new DeleteUser(+user.id)).subscribe(
      () => this.getStaticUsers()
    )
  }

  edit(user: IUser): void {
    this.user = user;
    this.editForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      phone: user.phone,
      email: user.email,
    });
  };

  saveUser(): void {
    this.user = {
      ...this.user,
      firstName: this.editForm.controls.firstName.value,
      lastName: this.editForm.controls.lastName.value,
      userName: this.editForm.controls.userName.value,
      phone: this.editForm.controls.phone.value,
      email: this.editForm.controls.email.value
    }

    this.store.dispatch(new Update(this.user)).subscribe(
      () => this.getStaticUsers()
    )
  }
}
