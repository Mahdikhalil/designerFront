import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjectService} from "../../../services/ProjectService";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";
import {CompressFileService} from "../../../services/compress-file.service";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  @Output() goBack = new EventEmitter();

  imgURL: any;
  userFile;
  message: string;
  public imagePath;
  idClient: string;
  photoComment : string;
  stageCounter : number = 0;

  constructor(private projectService: ProjectService,
              private toaster: ToastrService,
              private fileCompress: CompressFileService
              ) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.projectService.idClient$.subscribe(idPro => {
      this.idClient = idPro;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > 10000000) {
        this.fileCompress.compress(file)
          .pipe(take(1))
          .subscribe(compressedImage => {
            var newFile = new File([compressedImage], file.name,{type :file.type});
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

  addImages() {
    const formData = new FormData();
    formData.append('file', this.userFile);
    formData.append('comment',this.photoComment);
    formData.append('stage',"R+"+this.stageCounter);
    formData.append('isPhotoAccueil',"false");
    this.subscriptions.add(this.projectService.addImages(formData, this.idClient).subscribe(ok => {
    },response =>{
      if(response.status == 200){
        this.imgURL = null;
        this.userFile = null;
        this.toaster.success("Image sauvegardé ","Projet");
      }else{
        this.toaster.error("Ca doit être une Image ","Projet");
      }
    }));
  }

  returnToAllImages() {
    this.goBack.emit(true);
  }

  nextStage() {
    this.stageCounter++;
  }
}
