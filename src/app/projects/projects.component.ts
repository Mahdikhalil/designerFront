import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from "../services/ProjectService";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {ProjectDto} from "../entities/projectDto";
import {AuthService} from "../services/AuthService";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  projects: Array<ProjectDto> = new Array<ProjectDto>();
  urlForPdf: string;

  constructor(private projectService: ProjectService,
              private toastr: ToastrService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getData();
    this.urlForPdf = environment.hostUrl + "/projects/pdf/generate/"
  }

  getData(): any {
    this.subscriptions.add(this.projectService.getAllProjectsAccueil().subscribe(projects => {
        this.projects = projects;
      }, response => {
        if (response.status !== 200) {
          this.toastr.error("Veuillez réessayer ultérieurement", "Projets");
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();

  }


  logout() {
    this.authService.disconnet();
  }

  goIn(idClient: string): any {
    // this.projectService.idClient$.next(idClient);
    // this.router.navigate(['/stepper']);
  }

  delete(idClient: string) {
    if (confirm("êtes vous sur de vouloir effacé " + idClient)) {
      this.subscriptions.add(this.projectService.deleteProject(idClient).subscribe(rep => {
      }, response => {
        if (response.status !== 200) {
          this.toastr.error("Veuillez réessayer ultérieurement", "Projets");
        } else {
          this.getData();
          this.toastr.success("Project " + idClient + " à été supprimé", "Projets");
        }
      }));
    }
  }

  newProject() {
    this.router.navigate(['/stepper']);
  }
}
