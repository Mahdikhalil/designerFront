import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProjectService} from "../../services/ProjectService";

@Component({
  selector: 'app-montage-installation-formulaire',
  templateUrl: './montage-installation-formulaire.component.html',
  styleUrls: ['./montage-installation-formulaire.component.css']
})
export class MontageInstallationFormulaireComponent implements OnInit {

  @Output() goBack = new EventEmitter();
  @Output() goNext = new EventEmitter();
  idClient: string;
  montageInstallationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,) {
  }

  ngOnInit(): void {
    this.montageInstallationForm = this.formBuilder.group({
      supportImplantation: [''],
      calages: [''],
      supportAmarrage: [''],
      nbrAncrageTheorique: [''],
      nbrAncrageConstate: [''],
      confirmiteDispositifsRepartitionsChargeSurAppuis: [''],
      montageParticulie:[''],
      lequelsMontageParticulie: [''],
      presencePareGravats: [''],
      presenceConsoles: [''],
      largeursPresenceConsoles: [''],
      echaufaudages: [''],
      risqueElectrique: [''],
      precautionRisqueElectrique: [''],
      monteConformementNoticeDuFabriquant: [''],
      monteConformementPlanMontage: [''],
      presencePanneauxInformationChargeExploitation: [''],
      noteCalculEtabliParPersonneCimpetente: [''],

    });
  }

  previous() {
    this.goBack.emit(true);
  }

  next() {
    this.goNext.emit(true);
  }

}
