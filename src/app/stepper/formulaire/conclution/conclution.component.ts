import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjectService} from "../../../services/ProjectService";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-conclution',
  templateUrl: './conclution.component.html',
  styleUrls: ['./conclution.component.css']
})
export class ConclutionComponent implements OnInit,OnDestroy {

  subscriptions: Subscription = new Subscription();


  @Output() goBack = new EventEmitter();
  @Output() goHome = new EventEmitter();

  idClient: string;
  select: string;
  url: string;
  enableDownload: boolean;

  constructor(private projectService: ProjectService,
              private router: Router,
              private toaster: ToastrService,
              ) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.projectService.idClient$.subscribe(idClient => {
      this.url = environment.hostUrl + "/projects/pdf/generate/"+idClient
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  finish(): any {
    this.subscriptions.add(this.projectService.idClient$.subscribe(idClient => {
      this.subscriptions.add(this.projectService.saveConclution(this.select, idClient).subscribe(ok => {
      },response =>{
        if(response.status == 200){
          this.enableDownload = true;
          this.toaster.success("Bravo, vous avez terminé. Vous pouvez désormais télécharger votre pdf")
        }else{
          this.toaster.error("Vous devez choisir une conclution ");
        }
      }));
    }));
  }


  previous() {
    this.goBack.emit(true);
  }

  Accueil() {
    this.goHome.emit(true);
  }
}
