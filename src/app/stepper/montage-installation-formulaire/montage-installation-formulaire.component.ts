import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-montage-installation-formulaire',
  templateUrl: './montage-installation-formulaire.component.html',
  styleUrls: ['./montage-installation-formulaire.component.css']
})
export class MontageInstallationFormulaireComponent implements OnInit {

  @Output() goBack = new EventEmitter();
  @Output() goNext = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  previous() {
    this.goBack.emit(true);
  }

  next() {
    this.goNext.emit(true);
  }

}
