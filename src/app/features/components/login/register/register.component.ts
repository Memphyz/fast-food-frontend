import { User } from './../../../../core/models/user.model';
import { UserService } from './../../../../core/services/user/user.service';
import { isValidCpf } from './../../../shared/validators/cpf';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'fast-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public readonly form = new FormBuilder().group({
    email: [undefined, Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
    name: [undefined, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(80)])],
    surname: [undefined, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(80)])],
    born: [undefined, Validators.compose([Validators.required])],
    password: [undefined, Validators.compose([Validators.required, Validators.minLength(5)])],
    cpf: [undefined, Validators.compose([Validators.required, isValidCpf, Validators.minLength(11), Validators.maxLength(11)])],
  });

  constructor(private readonly userService: UserService, private readonly router: Router) {}

  public btnSave(): void {
    this.userService.save({ ...this.form.value, born: '11-12-2001' } as User).subscribe();

  }

}
