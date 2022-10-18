import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Project} from '../entities/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  idClient$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  idClientFromNextStep$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  newProject$: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);

  constructor(private http: HttpClient
  ) {
  }

  saveProject(project: Project): any {
    return this.http.post<any>(environment.hostUrl + `/projects/save/`, project);
  }

  saveFormulaire(project: Project, idClient: String): any {
    return this.http.put<any>(environment.hostUrl + `/projects/formulaire/` + idClient, project);
  }

  putFirstirstFormulaire(project: Project, idClient: String): any {
    return this.http.put<any>(environment.hostUrl + `/projects/put/` + idClient, project);
  }

  saveConclution(conclution: string, idClient: string): any {
    return this.http.put<any>(environment.hostUrl + `/projects/conclution/` + idClient, conclution);
  }

  getAllPhotoNamesByIdClient(idClient: String): any {
    return this.http.get<any>(environment.hostUrl + `/projects/photos/names/` + idClient);
  }

  getAllPhotosByIdClient(idClient: String, isAccueilPhoto: boolean): any {
    return this.http.get<any>(environment.hostUrl + `/projects/images/all/` + idClient + `/accueil/photo/` + isAccueilPhoto);
  }

  getProjectByIdClient(idClient: String): any {
    return this.http.get<any>(environment.hostUrl + `/projects/project/` + idClient);
  }

  addImages(formData: FormData, idClient: String): any {
    return this.http.post<any>(environment.hostUrl + `/projects/addImg/` + idClient, formData);
  }

  saveAdequationFormulaire(project: Project, idClient: String): any {
    return this.http.put<any>(environment.hostUrl + `/projects/formulaire/adequation/` + idClient, project);
  }

  saveMontageInstallationFormulaire(project: Project, idClient: String): any {
    return this.http.put<any>(environment.hostUrl + `/projects/formulaire/montage/installation/` + idClient, project);
  }

  getAllProjectsAccueil(): any {
    return this.http.get<any>(environment.hostUrl + `/projects/all/accueil`);
  }

  deleteProject(idClient: String): any{
    return this.http.delete<any>(environment.hostUrl + `/projects/delete/`+idClient);
  }

}
