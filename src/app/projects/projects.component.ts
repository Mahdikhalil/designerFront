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
  tempData: Array<ProjectDto> = new Array<ProjectDto>();
  urlForPdf: string;

  constructor(private projectService: ProjectService,
              private toastr: ToastrService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    if(!(localStorage.getItem("token") === "true"))
      this.router.navigate(['/login']);
    this.getData();
    this.urlForPdf = environment.hostUrl + "/projects/pdf/generate/"
  }

  getData(): any {
    this.subscriptions.add(this.projectService.getAllProjectsAccueil().subscribe(projects => {
      this.projects = projects;
      this.tempData = projects;
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
    this.projectService.idClientFromNextStep$.next(idClient);
    this.router.navigate(['/stepper']);
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
    this.projectService.newProject$.next(true);
    this.router.navigate(['/stepper']);
  }

  changeCredentials() {
    this.subscriptions.add(this.authService.userLoggedIn$.subscribe(user => {
      if (user == false) {
        this.toastr.info("Déconnection Automatique", "Veillez reconnecter afin de pouvoir changer votre identifiant ")
        this.logout();
      } else {
        this.router.navigate(['/credentials']);
      }
    }));
  }


  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    this.projects = this.tempData.filter(item => {
      return (item?.id?.toString() === val || item?.idClient?.toLowerCase().includes(val)
        || item?.clientName?.toLowerCase().includes(val) || item?.adresse?.toLowerCase().includes(val))

    })
  };


}
