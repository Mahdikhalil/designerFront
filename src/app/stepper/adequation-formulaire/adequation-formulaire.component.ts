import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../services/ProjectService";

@Component({
  selector: 'app-adequation-formulaire',
  templateUrl: './adequation-formulaire.component.html',
  styleUrls: ['./adequation-formulaire.component.css']
})
export class AdequationFormulaireComponent implements OnInit {


  @Output() goBack = new EventEmitter();
  @Output() goNext = new EventEmitter();
  adequationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,) {
  }

  ngOnInit(): void {
      this.adequationForm = this.formBuilder.group({
      natureOfWork: ['', [Validators.required]],
      surchagePonctuelleEventuelle: [],
      poidsSurcharge: [],
      hauteurSurcharge: [],
      marqueEchaffodage: ['', [Validators.required]],
      typeEchafaudage: ['', [Validators.required]],
      classeEchaffodage: ['', [Validators.required]],
      chargeAdmissibleEchafodage: ['', [Validators.required]],
      longueurDimensions: ['', [Validators.required]],
      hauteurDimensions: ['', [Validators.required]],
      largeurDimensions: ['', [Validators.required]],
      premierNiveau: ['', [Validators.required]],
      nombreNiveau: ['', [Validators.required]],
      nombreTramDacces: ['', [Validators.required]],
      typeAccesPlancheurTravail: ['', [Validators.required]],
      echafaudageApproprieAusTravauxRealiser: ['', [Validators.required]],

    });
  }

  previous() {
    this.goBack.emit(true);
  }

  next() {

    this.goNext.emit(true);
  }

}
