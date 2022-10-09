import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../services/ProjectService';



@Component({
  selector: 'app-photos-step',
  templateUrl: './photos-step.component.html',
  styleUrls: ['./photos-step.component.css']
})
export class PhotosStepComponent implements OnInit {

  @Input() idClient;
  @Output() addPhoto = new EventEmitter();
  @Output() goBack = new EventEmitter();
  @Output() goNext = new EventEmitter();


  nameOfPhotos: Array<string>;



  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService) { }


  ngOnInit(): void {

    this.projectService.idClient$.subscribe(idClient => {
      this.projectService.getAllPhotoNamesByIdClient(idClient).subscribe(photos => {
        this.nameOfPhotos = photos;
      });
    });

    if(!(localStorage.getItem("token") === "true"))
      this.router.navigate(['/login']);


  }

  addPhotos() {
    this.addPhoto.emit(true)
  }

  previous() {
    this.goBack.emit(true)

  }

  next() {
    this.goNext.emit(true);
  }
}
