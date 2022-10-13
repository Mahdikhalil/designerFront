import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectService} from "../../../services/ProjectService";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

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
              ) {
  }

  ngOnInit(): void {
    this.projectService.idClient$.subscribe(idPro => {
      this.idClient = idPro;
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

  addImages() {
    const formData = new FormData();
    formData.append('file', this.userFile);
    formData.append('comment',this.photoComment);
    formData.append('stage',"R+"+this.stageCounter);
    formData.append('isPhotoAccueil',"false");
    this.projectService.addImages(formData, this.idClient).subscribe(ok => {
    },response =>{
      if(response.status == 200){
        this.imgURL = null;
        this.toaster.success("Image sauvegarder ");
      }else{
        this.toaster.error("Ca doit être une Image ");
      }
    });
  }

  returnToAllImages() {
    this.goBack.emit(true);
  }

  nextStage() {
    this.stageCounter++;
  }
}
