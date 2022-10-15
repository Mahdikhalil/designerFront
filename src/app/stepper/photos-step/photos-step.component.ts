import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../services/ProjectService';
import {Subscription} from "rxjs";



@Component({
  selector: 'app-photos-step',
  templateUrl: './photos-step.component.html',
  styleUrls: ['./photos-step.component.css']
})
export class PhotosStepComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  @Input() idClient;
  @Output() addPhoto = new EventEmitter();
  @Output() goBack = new EventEmitter();
  @Output() goNext = new EventEmitter();


  photos: Array<string>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService) { }


  ngOnInit(): void {

    this.subscriptions.add(this.projectService.idClient$.subscribe(idClient => {
      this.subscriptions.add(this.projectService.getAllPhotosByIdClient(idClient,false).subscribe(photos => {
        this.photos = photos;
      }));
    }));

    if(!(localStorage.getItem("token") === "true"))
      this.router.navigate(['/login']);

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
