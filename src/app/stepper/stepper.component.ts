import {Component, OnInit, Output} from '@angular/core';
import {AuthService} from '../services/AuthService';
import {Router} from '@angular/router';
import {User} from '../entities/user';
import {ProjectService} from "../services/ProjectService";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  user:User;
  idClient: String;
  step:number = 1;
  isAddPhoto: boolean = false;

  constructor(private router: Router,
              private authService : AuthService,
              private projectService: ProjectService) { }

  ngOnInit(): void {
    if(!(localStorage.getItem("token") === "true"))
      this.router.navigate(['/login']);
    this.authService.userLoggedIn$.subscribe(user=>{
      this.user=user;
    });
  }

  logout() {
    this.authService.disconnet();
  }

  firstStepDone(event: any) {
    this.idClient= event;
    this.projectService.idClient$.next(this.idClient);
    this.step++;

  }
  goBack(event) {
    if(!this.isAddPhoto){
      this.step --;
    }
    this.isAddPhoto = false;
  }

  goNext($event: any) {
    this.step++;
  }

  addPhoto($event: any) {
    this.isAddPhoto = true;
  }
}
