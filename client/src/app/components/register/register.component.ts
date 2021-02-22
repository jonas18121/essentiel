import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {SignUpInfo} from "../../services/auth/signup-info";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private router: Router,
              private authService: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.goToLogin(this.form.username);


      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  goToLogin(username: string) {
    this.router.navigate(['/login'], { queryParams: { username: username } });
  }
}
