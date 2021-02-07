import { Component, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from './../../shared/services/auth.service';
import { IUser } from './../../shared/interfaces/user.interface';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  users: IUser[] = [];
  loginForm: FormGroup;
  // isLogin: boolean;
  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  ngOnInit(): void {
    this.getStaticUser();
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
    // this.checkUser();
  }


  // checkUser(): void {
  //   this.authService.userStatusChanges.subscribe(
  //     () => {
  //       if (localStorage.getItem('user')) {
  //         this.isLogin = true;
  //       } else {
  //         this.isLogin = false;
  //       }
  //     }
  //   )
  // }

  getStaticUser(): void {
    this.authService.getJSONUsers().pipe(take(1)).subscribe(
      data => this.users = data
    )
  }

  signIn(): void {
    if (!localStorage.getItem('user')) {
      this.authService.signIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
      this.loginForm.reset();
    } else {
      alert('ви зареєстровані');
    }
  }

}
