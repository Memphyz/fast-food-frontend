import { UserService } from './../../../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { isValidCpf } from 'src/app/features/shared/validators/cpf';

@UntilDestroy()
@Component({
  selector: 'fast-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public readonly form = new FormBuilder().group({
    password: [undefined, Validators.compose([Validators.required, Validators.minLength(5)])],
    cpf: [undefined, Validators.compose([Validators.required, isValidCpf, Validators.minLength(11), Validators.maxLength(11)])],
    email: [undefined, Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
    option: [undefined]
  });

  constructor(private readonly userService: UserService, private readonly router: Router) {}

  public ngOnInit(): void {
    this.form.get('option').valueChanges.pipe(untilDestroyed(this)).subscribe((): void => {
      this.form.get('email').reset();
      this.form.get('cpf').reset();
    });
  }

  public btnLogin(): void {
    this.userService.login(this.form.value).subscribe(() => {
      this.router.navigate(['../', 'home'])
    })
  }
}
