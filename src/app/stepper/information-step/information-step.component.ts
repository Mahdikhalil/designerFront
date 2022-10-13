import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProjectService} from '../../services/ProjectService';
import {Project} from '../../entities/project';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-information-step',
  templateUrl: './information-step.component.html',
  styleUrls: ['./information-step.component.css']
})
export class InformationStepComponent implements OnInit {

  @Output() firstIsDone = new EventEmitter();

  informationForm: FormGroup;
  imgURL: any;
  userFile;
  public imagePath;
  message: string;
  idClient: string;
  project: Project = new Project();
  photo: string ="";

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {

    if (!(localStorage.getItem('token') === 'true')) {
      this.router.navigate(['/login']);
    }

    this.informationForm = this.formBuilder.group({
      idClient: [],
      adresse: [],
      clientName: [],
      frontLength: [],
      frontHeight: [],
      file: [],
    });

    this.projectService.idClientFromNextStep$.subscribe(idClient => {
      if (idClient != false) {
        this.idClient = idClient;
        this.projectService.getProjectByIdClient(idClient).subscribe(project => {
          this.project = project;
        });
        this.projectService.getAllPhotosByIdClient(idClient, true).subscribe(photo => {
          this.photo = photo[0];
        });
      }
    });

  }


  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }


  next() {

    let project: Project = new Project();
    project.idClient = this.informationForm.get('idClient').value;
    project.adresse = this.informationForm.get('adresse').value;
    project.clientName = this.informationForm.get('clientName').value;
    project.frontHeight = this.informationForm.get('frontHeight').value;
    project.frontLength = this.informationForm.get('frontLength').value;
    const formData = new FormData();
    formData.append('file', this.userFile);
    formData.append('comment', "");
    formData.append('stage', "");
    formData.append('isPhotoAccueil', "true");


    if (this.idClient != null) {
      project.idClient = this.idClient;
      this.projectService.putFirstirstFormulaire(project, this.idClient).subscribe(ok => {
      }, response => {
        if (response.status == 200) {
          if (this.userFile != null) {
            this.projectService.addImages(formData, this.idClient).subscribe(ok => {
              this.toastr.success("Projet Modifié");
            });
          }
          this.firstIsDone.emit(this.idClient);
        } else {
          this.toastr.error("Erreur l'or de la modification");
        }
      });

    } else {

      this.projectService.saveProject(project).subscribe(ok => {
      }, response => {
        if (response.status == 200) {
          if (this.userFile != null) {
            this.projectService.addImages(formData, this.informationForm.get('idClient').value).subscribe(ok => {
              this.toastr.success("Projet ajouté avec succés");
            });
          }
          this.idClient = this.informationForm.get('idClient').value
          this.firstIsDone.emit(this.idClient);
        } else {
          this.toastr.error("Nom existe déjà");
        }
      });
    }
  }

  newProject() {
    if (this.idClient != null) {
      this.projectService.idClientFromNextStep$.next(false);
      this.idClient = null;
      this.project = null;

      this.informationForm.get('idClient').setValue('');
      this.informationForm.get('adresse').setValue('');
      this.informationForm.get('clientName').setValue('');
      this.informationForm.get('frontHeight').setValue('');
      this.informationForm.get('frontLength').setValue('');
    }
  }


}
