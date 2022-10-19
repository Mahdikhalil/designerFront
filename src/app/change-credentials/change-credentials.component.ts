import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../services/AuthService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-credentials',
  templateUrl: './change-credentials.component.html',
  styleUrls: ['./change-credentials.component.css']
})
export class ChangeCredentialsComponent implements OnInit,OnDestroy {

  subscriptions: Subscription = new Subscription();

  email: string;
  password: string;
  errorMessage = 'Cette adresse mail est déja prise';
  successMessage: string;
  invalidChange = false;
  changeSuccess = false;
  show: boolean = false;

  constructor(private authService : AuthService,
              private router: Router,) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  changeCredentials() {
    this.subscriptions.add(this.authService.userLoggedIn$.subscribe(user =>{
      console.log(user);
      this.subscriptions.add(this.authService.changeCredentials(null,this.email,this.password).subscribe(next =>{},response=>{
        if(response.status == 200){
          this.changeSuccess = true;
        }else{
          this.invalidChange = true;
        }
      }));
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
}
