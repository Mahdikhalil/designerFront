import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../services/ProjectService";
import {Project} from "../../entities/project";

@Component({
  selector: 'app-adequation-formulaire',
  templateUrl: './adequation-formulaire.component.html',
  styleUrls: ['./adequation-formulaire.component.css']
})
export class AdequationFormulaireComponent implements OnInit {


  @Output() goBack = new EventEmitter();
  @Output() goNext = new EventEmitter();
  idClient: string;
  adequationForm: FormGroup;
  surchagePonctuelleEventuelle: boolean;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,) {
  }

  ngOnInit(): void {
    this.adequationForm = this.formBuilder.group({
      natureOfWork: ['', [Validators.required]],
      surchagePonctuelleEventuelle: [false],
      poidsSurcharge: [''],
      hauteurSurcharge: [''],
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
    if (!this.adequationForm.valid) {
      alert("Champs obligatoires (*) ");
    } else {
      this.projectService.idClient$.subscribe(idClient => {
        this.idClient = idClient;
        let project: Project = new Project();
        project.natureOfWork = this.adequationForm.get('natureOfWork').value;
        project.surchagePonctuelleEventuelle = this.adequationForm.get('surchagePonctuelleEventuelle').value;
        project.poidsSurcharge = this.adequationForm.get('poidsSurcharge').value;
        project.hauteurSurcharge = this.adequationForm.get('hauteurSurcharge').value;
        project.marqueEchaffodage = this.adequationForm.get('marqueEchaffodage').value;
        project.typeEchafaudage = this.adequationForm.get('typeEchafaudage').value;
        project.classeEchaffodage = this.adequationForm.get('classeEchaffodage').value;
        project.chargeAdmissibleEchafodage = this.adequationForm.get('chargeAdmissibleEchafodage').value;
        project.longueurDimensions = this.adequationForm.get('longueurDimensions').value;
        project.hauteurDimensions = this.adequationForm.get('hauteurDimensions').value;
        project.largeurDimensions = this.adequationForm.get('largeurDimensions').value;
        project.premierNiveau = this.adequationForm.get('premierNiveau').value;
        project.nombreNiveau = this.adequationForm.get('nombreNiveau').value;
        project.nombreTramDacces = this.adequationForm.get('nombreTramDacces').value;
        project.typeAccesPlancheurTravail = this.adequationForm.get('typeAccesPlancheurTravail').value;
        project.echafaudageApproprieAusTravauxRealiser = this.adequationForm.get('echafaudageApproprieAusTravauxRealiser').value;
        console.log(project);
        this.projectService.saveAdequationFormulaire(project, this.idClient).subscribe(ok => {
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
