import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../services/AuthService';
import {Router} from '@angular/router';
import {User} from '../entities/user';
import {ProjectService} from "../services/ProjectService";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit,OnDestroy {

  subscriptions: Subscription = new Subscription();

  user:User;
  idClient: String;
  step:number = 1;
  isAddPhoto: boolean = false;

  constructor(private router: Router,
              private authService : AuthService,
              private projectService: ProjectService,
              private toaster: ToastrService,) { }



  ngOnInit(): void {
    if(!(localStorage.getItem("token") === "true"))
      this.router.navigate(['/login']);
    this.subscriptions.add(this.authService.userLoggedIn$.subscribe(user=>{
      this.user=user;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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

  goHome($event: any) {
    this.step=1;
  }

  projects() {
    this.router.navigate(['/projects']);
  }

  changeCredentials() {
    this.subscriptions.add(this.authService.userLoggedIn$.subscribe(user =>{
      console.log(user);
      if(user == false ){
        this.toaster.info("Déconnection Automatique", "Veillez reconnecter afin de pouvoir changer votre identifiant ")
        this.logout();
      }else{
        this.router.navigate(['/credentials']);
      }
    }));
  }
}
