import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../services/ProjectService";
import {Project} from "../../entities/project";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-adequation-formulaire',
  templateUrl: './adequation-formulaire.component.html',
  styleUrls: ['./adequation-formulaire.component.css']
})
export class AdequationFormulaireComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  @Output() goBack = new EventEmitter();
  @Output() goNext = new EventEmitter();
  idClient: string;
  adequationForm: FormGroup;
  project: Project = new Project();


  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private toaster: ToastrService,) {
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

    this.subscriptions.add(this.projectService.idClient$.subscribe(idClient => {
      this.subscriptions.add(this.projectService.getProjectByIdClient(idClient).subscribe(project => {
        this.project = project;
        this.settingsValues();
      }));
    }));


  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  previous() {
    this.subscriptions.add(this.projectService.idClient$.subscribe(idClient => {
      this.projectService.idClientFromNextStep$.next(idClient);
    }));
    this.goBack.emit(true);
  }

  settingsValues() {
    if (this.project != null) {
      this.adequationForm.get('natureOfWork').setValue(this.project.natureOfWork);
      this.adequationForm.get('surchagePonctuelleEventuelle').setValue(this.project.surchagePonctuelleEventuelle);
      this.adequationForm.get('poidsSurcharge').setValue(this.project.poidsSurcharge);
      this.adequationForm.get('hauteurSurcharge').setValue(this.project.hauteurSurcharge);
      this.adequationForm.get('marqueEchaffodage').setValue(this.project.marqueEchaffodage);
      this.adequationForm.get('typeEchafaudage').setValue(this.project.typeEchafaudage);
      this.adequationForm.get('classeEchaffodage').setValue(this.project.classeEchaffodage);
      this.adequationForm.get('chargeAdmissibleEchafodage').setValue(this.project.chargeAdmissibleEchafodage);
      this.adequationForm.get('longueurDimensions').setValue(this.project.longueurDimensions);
      this.adequationForm.get('hauteurDimensions').setValue(this.project.hauteurDimensions);
      this.adequationForm.get('largeurDimensions').setValue(this.project.largeurDimensions);
      this.adequationForm.get('premierNiveau').setValue(this.project.premierNiveau);
      this.adequationForm.get('nombreNiveau').setValue(this.project.nombreNiveau);
      this.adequationForm.get('nombreTramDacces').setValue(this.project.nombreTramDacces);
      this.adequationForm.get('typeAccesPlancheurTravail').setValue(this.project.typeAccesPlancheurTravail);
      this.adequationForm.get('echafaudageApproprieAusTravauxRealiser').setValue(this.project.echafaudageApproprieAusTravauxRealiser);
    }
  }

  next() {
    if (!this.adequationForm.valid) {
      this.toaster.warning("Champs obligatoires (*) ");
    } else {
      this.subscriptions.add(this.projectService.idClient$.subscribe(idClient => {
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
        this.subscriptions.add(this.projectService.saveAdequationFormulaire(project, this.idClient).subscribe(ok => {
        }, response => {
          if (response.status == 200) {
            this.goNext.emit(true);
          } else {
            this.toaster.error("Une erreur est survenu ");
          }
        }));
      }));
    }
  }


}
