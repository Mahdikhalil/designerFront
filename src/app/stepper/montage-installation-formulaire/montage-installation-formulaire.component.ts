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
  project: Project = new Project();


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
      montageParticulie: [false],
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

    this.projectService.idClient$.subscribe(idClient => {
      this.projectService.getProjectByIdClient(idClient).subscribe(project => {
        this.project = project;
        this.settingsValues();
      });
    });

  }


  settingsValues(){
    if(this.project != null){
      this.montageInstallationForm.get('supportImplantation').setValue(this.project.supportImplantation);
      this.montageInstallationForm.get('calages').setValue(this.project.calages);
      this.montageInstallationForm.get('supportAmarrage').setValue(this.project.supportAmarrage);
      this.montageInstallationForm.get('nbrAncrageTheorique').setValue(this.project.nbrAncrageTheorique);
      this.montageInstallationForm.get('nbrAncrageConstate').setValue(this.project.nbrAncrageConstate);
      this.montageInstallationForm.get('confirmiteDispositifsRepartitionsChargeSurAppuis').setValue(this.project.confirmiteDispositifsRepartitionsChargeSurAppuis);
      this.montageInstallationForm.get('montageParticulie').setValue(this.project.montageParticulie);
      this.montageInstallationForm.get('lequelsMontageParticulie').setValue(this.project.lequelsMontageParticulie);
      this.montageInstallationForm.get('presencePareGravats').setValue(this.project.presencePareGravats);
      this.montageInstallationForm.get('presenceConsoles').setValue(this.project.presenceConsoles);
      this.montageInstallationForm.get('largeursPresenceConsoles').setValue(this.project.largeursPresenceConsoles);
      this.montageInstallationForm.get('echaufaudages').setValue(this.project.echaufaudages);
      this.montageInstallationForm.get('risqueElectrique').setValue(this.project.risqueElectrique);
      this.montageInstallationForm.get('precautionRisqueElectrique').setValue(this.project.precautionRisqueElectrique);
      this.montageInstallationForm.get('monteConformementNoticeDuFabriquant').setValue(this.project.monteConformementNoticeDuFabriquant);
      this.montageInstallationForm.get('monteConformementPlanMontage').setValue(this.project.monteConformementPlanMontage);
      this.montageInstallationForm.get('presencePanneauxInformationChargeExploitation').setValue(this.project.presencePanneauxInformationChargeExploitation);
      this.montageInstallationForm.get('noteCalculEtabliParPersonneCimpetente').setValue(this.project.noteCalculEtabliParPersonneCimpetente);
    }
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
        project.supportImplantation = this.montageInstallationForm.get('supportImplantation').value;
        project.calages = this.montageInstallationForm.get('calages').value;
        project.supportAmarrage = this.montageInstallationForm.get('supportAmarrage').value;
        project.nbrAncrageTheorique = this.montageInstallationForm.get('nbrAncrageTheorique').value;
        project.nbrAncrageConstate = this.montageInstallationForm.get('nbrAncrageConstate').value;
        project.confirmiteDispositifsRepartitionsChargeSurAppuis = this.montageInstallationForm.get('confirmiteDispositifsRepartitionsChargeSurAppuis').value;
        project.montageParticulie = this.montageInstallationForm.get('montageParticulie').value;
        project.lequelsMontageParticulie = this.montageInstallationForm.get('lequelsMontageParticulie').value;
        project.presencePareGravats = this.montageInstallationForm.get('presencePareGravats').value;
        project.presenceConsoles = this.montageInstallationForm.get('presenceConsoles').value;
        project.largeursPresenceConsoles = this.montageInstallationForm.get('largeursPresenceConsoles').value;
        project.echaufaudages = this.montageInstallationForm.get('echaufaudages').value;
        project.risqueElectrique = this.montageInstallationForm.get('risqueElectrique').value;
        project.precautionRisqueElectrique = this.montageInstallationForm.get('precautionRisqueElectrique').value;
        project.monteConformementNoticeDuFabriquant = this.montageInstallationForm.get('monteConformementNoticeDuFabriquant').value;
        project.monteConformementPlanMontage = this.montageInstallationForm.get('monteConformementPlanMontage').value;
        project.presencePanneauxInformationChargeExploitation = this.montageInstallationForm.get('presencePanneauxInformationChargeExploitation').value;
        project.noteCalculEtabliParPersonneCimpetente = this.montageInstallationForm.get('noteCalculEtabliParPersonneCimpetente').value;
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
