import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectService} from "../../../services/ProjectService";
import {Router} from "@angular/router";

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
  select : string;


  constructor(private projectService: ProjectService,
              private router: Router,) {
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
      console.log(file.name + " file")
      // this.f['profile'].setValue(file);
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
    formData.append('select',this.select);
    this.projectService.addImages(formData, this.idClient).subscribe(ok => {
    },response =>{
      if(response.status == 200){
        confirm("Image sauvegarder ");
      }else{
        alert("Une erreur est survenu ");
      }
    });
  }

  returnToAllImages() {
    this.goBack.emit(true);
  }
}
