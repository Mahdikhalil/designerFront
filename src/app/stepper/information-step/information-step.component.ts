import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProjectService} from '../../services/ProjectService';
import {Project} from '../../entities/project';
import {Router} from '@angular/router';

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
  idClientFromNextStep$: string;
  project : Project;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private router: Router,) {
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
      this.projectService.getProjectByIdClient(idClient).subscribe(project => {
        this.project = project;
      });
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
    this.projectService.saveOrUpdateProject(project).subscribe(ok => {
    }, response => {
      if (response.status == 200) {
        if (this.userFile != null) {
          this.projectService.addImages(formData, this.informationForm.get('idClient').value).subscribe(ok => {
          });
        }
        this.idClient = this.informationForm.get('idClient').value
        this.firstIsDone.emit(this.idClient);
      } else {
        alert("Nom du projet existe déja ");
      }
    });

  }


}
