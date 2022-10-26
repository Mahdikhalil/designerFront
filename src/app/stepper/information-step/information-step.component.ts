import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProjectService} from '../../services/ProjectService';
import {Project} from '../../entities/project';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";
import {CompressFileService} from "../../services/compress-file.service";


@Component({
  selector: 'app-information-step',
  templateUrl: './information-step.component.html',
  styleUrls: ['./information-step.component.css']
})
export class InformationStepComponent implements OnInit, OnDestroy {

  @Output() firstIsDone = new EventEmitter();

  subscriptions: Subscription = new Subscription();

  informationForm: FormGroup;
  imgURL: any;
  userFile;
  public imagePath;
  message: string;
  idClient: string;
  project: Project = new Project();
  photo: string = null;
  bool: boolean;


  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private router: Router,
              private toastr: ToastrService,
              private ref: ChangeDetectorRef,
              private fileCompress: CompressFileService) {
    this.subscriptions.add(this.projectService.newProject$.subscribe(bool => {
      this.bool = bool;
    }));
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


    if (!this.bool) {
      this.subscriptions.add(this.projectService.idClientFromNextStep$.subscribe(idClient => {
        if (idClient != false) {
          this.idClient = idClient;
          this.subscriptions.add(this.projectService.getProjectByIdClient(idClient).subscribe(project => {
            this.project = project;
          }));
          this.subscriptions.add(this.projectService.getAllPhotosByIdClient(idClient, true).subscribe(photo => {
            this.photo = photo[0];
          }));
        }
      }));
    } else {
      this.newProject();
      this.projectService.newProject$.next(false);
    }


  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];

      if (file.size > 10000000) {
        this.fileCompress.compress(file)
          .pipe(take(1))
          .subscribe(compressedImage => {
            var newFile = new File([compressedImage], file.name, {type: file.type});
            this.userFile = newFile;
          });
      } else {
        this.userFile = file;
      }

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
      if (this.informationForm.get('idClient').value == null) {
        project.idClient = this.idClient;
      } else {
        project.idClient = this.informationForm.get('idClient').value;
      }
      this.subscriptions.add(this.projectService.putFirstirstFormulaire(project, this.idClient).subscribe(idClient => {}, response => {
        if (response.status == 200) {
          if (this.userFile != null) {
            this.subscriptions.add(this.projectService.addImages(formData, this.idClient).subscribe(ok => {
            }, response => {
              if (response.status === 200) {
                this.firstIsDone.emit(this.informationForm.get('idClient').value != null ? this.informationForm.get('idClient').value : this.idClient);
                this.toastr.success("Projet ajouté avec succés", "Projet");
              } else {
                this.toastr.error("L'image n'a pas pu être téléchargé", "Projet");
              }
            }));
          } else {
            this.firstIsDone.emit(this.informationForm.get('idClient').value != null ? this.informationForm.get('idClient').value : this.idClient);
          }
        } else {
          this.toastr.error("Erreur l'or de la modification", "Projet");
        }
      }));

    } else {
      if (this.informationForm.get('idClient').value != "") {
        this.subscriptions.add(this.projectService.saveProject(project).subscribe(next => {
        }, res => {
          if (res.status !== 200) {
            this.toastr.error("Nom du projet doit être unique", "Projet");
          } else {
            if (this.userFile != null) {
              this.subscriptions.add(this.projectService.addImages(formData, this.informationForm.get('idClient').value).subscribe(ok => {
              }, response => {
                if (response.status === 200) {
                  this.idClient = this.informationForm.get('idClient').value;
                  this.firstIsDone.emit(this.informationForm.get('idClient').value);
                  this.toastr.success("Projet ajouté avec succés", "Projet");
                } else {
                  this.toastr.error("L'image n'a pas pu être téléchargé", "Projet");
                }
              }));
            } else {
              this.idClient = this.informationForm.get('idClient').value;
              this.firstIsDone.emit(this.informationForm.get('idClient').value);
            }
          }
        }));
      }
    }
  }

  newProject() {
    this.informationForm.get('idClient').setValue('');
    this.informationForm.get('adresse').setValue('');
    this.informationForm.get('clientName').setValue('');
    this.informationForm.get('frontHeight').setValue('');
    this.informationForm.get('frontLength').setValue('');
    this.imgURL = null;
    this.photo = null;
    this.ref.detectChanges();

    if (this.idClient != null) {
      this.projectService.idClientFromNextStep$.next(false);
      this.idClient = null;
      this.project = new Project();

    }
  }


}
