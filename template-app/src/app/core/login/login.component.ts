import { MESSAGES_CONTAINER_ID } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeysStorage } from 'src/app/utils/enums/keys-storage.enum';
import { getFieldErrorFromForm, markAllFieldAsDirty } from 'src/app/utils/form/form/form';
import { ERROR_500 } from 'src/app/utils/messages/messages';
import { storage } from 'src/app/utils/storage';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm?: FormGroup;
  emailIsValid: boolean = true;
  display: boolean = true;
  loading: boolean = false;
  credentialsValid: boolean = true;
  messageFeedback: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {
    const TOKEN = storage.getEncripted(KeysStorage.TOKEN);
    if (TOKEN) {
      this.display = false;
      this.router.navigate(['home']);
      
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm?.get('email');
  }

  get password() {
    return this.loginForm?.get('password');
  }

  onSubmit(): void {
    this.loginForm?.controls['email'].addValidators([Validators.email]);
    this.loginForm?.controls['email'].updateValueAndValidity();

    this.loginForm?.markAllAsTouched();
    markAllFieldAsDirty(this.loginForm);


    if (this.loginForm?.valid) {
      const params = {
        email: this.loginForm?.value.email,
        password: this.loginForm?.value.password,
      }
      this.loading = true;
      this.loginService.login(params).subscribe({
        next: (sucess) => {
          storage.setEncripted(KeysStorage.TOKEN, sucess.token);
          this.credentialsValid = true;
          this.loading = false;
          this.display = false;
          this.router.navigate(['home']);

        },
        error: (err) => {
          console.error(err);
          this.loading = false;
          this.credentialsValid = false;
          this.messageFeedback = err.error.message?? ERROR_500
        },
      });


    }
  }

  getFieldError(field: string) {
    return getFieldErrorFromForm(this.loginForm, field);
  }


}
