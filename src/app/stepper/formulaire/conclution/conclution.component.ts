import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectService} from "../../../services/ProjectService";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-conclution',
  templateUrl: './conclution.component.html',
  styleUrls: ['./conclution.component.css']
})
export class ConclutionComponent implements OnInit {

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
    this.projectService.idClient$.subscribe(idClient => {
      this.url = environment.hostUrl + "/projects/pdf/generate/"+idClient
    });
  }


  finish(): any {
    this.projectService.idClient$.subscribe(idClient => {
      this.projectService.saveConclution(this.select, idClient).subscribe(ok => {
      },response =>{
        if(response.status == 200){
          this.enableDownload = true;
          this.toaster.success("Bravo, vous avez terminé. Vous pouvez désormais télécharger votre pdf")
        }else{
          this.toaster.error("Vous devez choisir une conclution ");
        }
      });
    });
  }


  previous() {
    this.goBack.emit(true);
  }

  Accueil() {
    this.goHome.emit(true);
  }
}
