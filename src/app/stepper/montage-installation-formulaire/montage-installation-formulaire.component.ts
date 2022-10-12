import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../services/ProjectService";
import {Project} from "../../entities/project";

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
      supportImplantation: ['', [Validators.required]],
      calages: ['', [Validators.required]],
      supportAmarrage: ['', [Validators.required]],
      nbrAncrageTheorique: [''],
      nbrAncrageConstate: [''],
      confirmiteDispositifsRepartitionsChargeSurAppuis: [''],
      montageParticulie:[false],
      lequelsMontageParticulie: ['', [Validators.required]],
      presencePareGravats: [false],
      presenceConsoles: [false],
      largeursPresenceConsoles: ['', [Validators.required]],
      echaufaudages: ['', [Validators.required]],
      risqueElectrique: [false],
      precautionRisqueElectrique: [''],
      monteConformementNoticeDuFabriquant: [false],
      monteConformementPlanMontage: [false],
      presencePanneauxInformationChargeExploitation: [false],
      noteCalculEtabliParPersonneCimpetente: [false],

    });
  }

  previous() {
    this.goBack.emit(true);
  }

  next() {
    if (!this.montageInstallationForm.valid) {
      alert("Champs obligatoires (*) ");
    } else {
      this.projectService.idClient$.subscribe(idClient => {
        this.idClient = idClient;
        let project: Project = new Project();
        project.supportImplantation = this.adequationForm.get('supportImplantation').value;
        project.calages = this.adequationForm.get('calages').value;
        project.supportAmarrage = this.adequationForm.get('supportAmarrage').value;
        project.nbrAncrageTheorique = this.adequationForm.get('nbrAncrageTheorique').value;
        project.nbrAncrageConstate = this.adequationForm.get('nbrAncrageConstate').value;
        project.confirmiteDispositifsRepartitionsChargeSurAppuis = this.adequationForm.get('confirmiteDispositifsRepartitionsChargeSurAppuis').value;
        project.montageParticulie = this.adequationForm.get('montageParticulie').value;
        project.lequelsMontageParticulie = this.adequationForm.get('lequelsMontageParticulie').value;
        project.presencePareGravats = this.adequationForm.get('presencePareGravats').value;
        project.presenceConsoles = this.adequationForm.get('presenceConsoles').value;
        project.largeursPresenceConsoles = this.adequationForm.get('largeursPresenceConsoles').value;
        project.echaufaudages = this.adequationForm.get('echaufaudages').value;
        project.risqueElectrique = this.adequationForm.get('risqueElectrique').value;
        project.precautionRisqueElectrique = this.adequationForm.get('precautionRisqueElectrique').value;
        project.monteConformementNoticeDuFabriquant = this.adequationForm.get('monteConformementNoticeDuFabriquant').value;
        project.monteConformementPlanMontage = this.adequationForm.get('monteConformementPlanMontage').value;
        project.presencePanneauxInformationChargeExploitation = this.adequationForm.get('presencePanneauxInformationChargeExploitation').value;
        project.noteCalculEtabliParPersonneCimpetente = this.adequationForm.get('noteCalculEtabliParPersonneCimpetente').value;
        this.projectService.saveMontageInstallationFormulaire(project, this.idClient).subscribe(ok => {
        }, response => {
          if (response.status == 200) {
            this.goNext.emit(true);
          } else {
            alert("Une erreur est survenu ");
          }
        });
      });
    }
  }

}
