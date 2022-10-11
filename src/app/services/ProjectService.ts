import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Project} from '../entities/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  idClient$: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(private http: HttpClient
  ) {}

  saveOrUpdateProject(project: Project): any {
    return this.http.post<any>(environment.hostUrl + `/projects/save/`,project);
  }

  saveFormulaire(project: Project,idClient: String): any{
    return this.http.put<any>(environment.hostUrl + `/projects/formulaire/`+idClient,project);
  }

  saveConclution(conclution : string, idClient:string): any {
    return this.http.put<any>(environment.hostUrl + `/projects/conclution/`+idClient,conclution);
  }

  getAllPhotoNamesByIdClient(idClient: String): any {
    return this.http.get<any>(environment.hostUrl + `/projects/photos/names/`+idClient);
  }

  getAllPhotosByIdClient(idClient: String): any {
    return this.http.get<any>(environment.hostUrl + `/projects/images/all/`+idClient);
  }

  addImages(formData: FormData,idClient: String ): any {
    return this.http.post<any>(environment.hostUrl + `/projects/addImg/`+idClient,formData);
  }
}
