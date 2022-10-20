import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../services/AuthService";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-change-credentials',
  templateUrl: './change-credentials.component.html',
  styleUrls: ['./change-credentials.component.css']
})
export class ChangeCredentialsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  email: string = "";
  password: string = "";
  errorMessage = 'Cette adresse mail est prise';
  successMessage: string;
  invalidChange = false;
  changeSuccess = false;
  show: boolean = false;
  showConfirm: boolean = false;
  Confirmpassword: string = "";

  constructor(private authService: AuthService,
              private router: Router,
              private toaster: ToastrService,) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.authService.userLoggedIn$.subscribe(user => {
      if (user == false) {
        this.router.navigate(['/projects']);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  changeCredentials() {
    this.subscriptions.add(this.authService.userLoggedIn$.subscribe(user => {
      if(this.Confirmpassword !== this.password){
        this.toaster.error("Vérifiez votre nouveau mot de passe");
      }else{
        this.subscriptions.add(this.authService.changeCredentials(user, this.email != "" ? this.email : "null", this.password != "" ? this.password : "null").subscribe(next => {
        }, response => {
          if (response.status == 200) {
            this.toaster.success("Modification sauvegarder");
            this.changeSuccess = true;
            this.logout();
          } else {
            this.invalidChange = true;
          }
        }));
      }
    }));
  }

  allProjects() {
    this.router.navigate(['/projects']);
  }

  logout() {
    this.authService.disconnet();
  }

  showHide() {
    this.show = !this.show;
  }

  showConfirmHide() {
    this.showConfirm = !this.showConfirm;
  }
}
