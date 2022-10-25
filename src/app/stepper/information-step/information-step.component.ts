import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProjectService} from '../../services/ProjectService';
import {Project} from '../../entities/project';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {Observable, Subscription} from "rxjs";
import {NgxImageCompressService} from "ngx-image-compress";
import {take} from "rxjs/operators";

// in bytes, compress images larger than 1MB
const fileSizeMax = 1 * 1024 * 1024;
// in pixels, compress images have the width or height larger than 1024px
const widthHeightMax = 1024;
const defaultWidthHeightRatio = 1;
const defaultQualityRatio = 20;


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
              private imageCompress: NgxImageCompressService) {
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


  private createImage(ev) {
    let imageContent = ev.target.result;
    const img = new Image();
    img.src = imageContent;
    return img;
  }

  compress(file: File): Observable<File> {
    const imageType = file.type || 'image/jpeg';
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return Observable.create((observer) => {
      // This event is triggered each time the reading operation is successfully completed.
      reader.onload = (ev) => {
        // Create an html image element
        const img = this.createImage(ev);
        // Choose the side (width or height) that longer than the other
        const imgWH = img.width > img.height ? img.width : img.height;

        // Determines the ratios to compress the image
        let withHeightRatio =
          imgWH > widthHeightMax
            ? widthHeightMax / imgWH
            : defaultWidthHeightRatio;
        let qualityRatio =
          file.size > fileSizeMax
            ? fileSizeMax / file.size
            : defaultQualityRatio;

        // Fires immediately after the browser loads the object
        img.onload = () => {
          const elem = document.createElement('canvas');
          // resize width, height
          elem.width = img.width * withHeightRatio;
          elem.height = img.height * withHeightRatio;

          const ctx = <CanvasRenderingContext2D>elem.getContext('2d');
          ctx.drawImage(img, 0, 0, elem.width, elem.height);
          ctx.canvas.toBlob(
            // callback, called when blob created
            (blob) => {
              observer.next(
                new File([blob], file.name, {
                  type: imageType,
                  lastModified: Date.now(),
                })
              );
            },
            imageType,
            qualityRatio // reduce image quantity
          );
        };
      };

      // Catch errors when reading file
      reader.onerror = (error) => observer.error(error);
    });
  }


  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];


      console.log(file)
      if (file.size > 10000000) {
        this.compress(file)
          .pipe(take(1))
          .subscribe(compressedImage => {
            var blob = new Blob([compressedImage], {type: 'image/png'});
            //var url = window.URL.createObjectURL(blob);
            //window.open(url);
            // now you can do upload the compressed image
            this.userFile = blob;
            console.log(this.userFile)
          });
      } else {
        this.userFile = file;
        console.log(this.userFile)
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
      this.subscriptions.add(this.projectService.putFirstirstFormulaire(project, this.idClient).subscribe(idClient => {
      }, response => {
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
