import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/AuthService';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  errorMessage = 'Mot de passe incorrect';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  formLogin: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("token") === "true")
      this.router.navigate(['/projects']);

    this.formLogin = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      password: [''],
    });
  }

  handleLogin() {
    this.email = this.formLogin.get('email').value;
    if(!this.formLogin.controls.email.errors?.pattern){
      this.password = this.formLogin.get('password').value;
      this.authService.connect(this.email, this.password).subscribe((result) => {
        if (result) {
          localStorage.setItem("token", "true");
          this.router.navigate(['/projects']);
          this.authService.userLoggedIn$.next(result);
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = 'Bienvenu';
        } else {
          this.invalidLogin = true;
          this.loginSuccess = false;
        }
      });
    }else{
      this.toastr.warning("Format invalide", "Adresse mail")
    }
  }

}
