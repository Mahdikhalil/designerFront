import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjectService} from "../../services/ProjectService";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Project} from "../../entities/project";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  @Output() goBack = new EventEmitter();
  @Output() goNext = new EventEmitter();

  idClient: string;
  formulaireForm: FormGroup;
  project: Project = new Project();


  constructor(private projectService: ProjectService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {


    this.formulaireForm = this.formBuilder.group({
      implantation: [],
      appuisAndCalages: [],
      conception: [],
      amenagements: [],
      chargement: [],
      stabilite: [],
      comment: [],
    });


    this.subscriptions.add(this.projectService.idClient$.subscribe(idPro => {
      this.idClient = idPro;
      this.subscriptions.add(this.projectService.getProjectByIdClient(idPro).subscribe(project => {
        this.project = project;
        if(this.project.implantation != null){
          this.settingsValues();
        }
      }));
    }));

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  settingsValues() {
    if (this.project != null) {
      this.formulaireForm.get('implantation').setValue(this.project.implantation);
      this.formulaireForm.get('appuisAndCalages').setValue(this.project.appuisAndCalages);
      this.formulaireForm.get('conception').setValue(this.project.conception);
      this.formulaireForm.get('amenagements').setValue(this.project.amenagements);
      this.formulaireForm.get('chargement').setValue(this.project.chargement);
      this.formulaireForm.get('stabilite').setValue(this.project.stabilite);
      this.formulaireForm.get('comment').setValue(this.project.comment);
    }
  }

  previous() {
    this.goBack.emit(true);
  }

  next() {
    this.subscriptions.add(this.projectService.idClient$.subscribe(idClient => {
      this.idClient = idClient;
      let project: Project = new Project();
      project.implantation = this.formulaireForm.get('implantation').value;
      project.appuisAndCalages = this.formulaireForm.get('appuisAndCalages').value;
      project.conception = this.formulaireForm.get('conception').value;
      project.amenagements = this.formulaireForm.get('amenagements').value;
      project.chargement = this.formulaireForm.get('chargement').value;
      project.stabilite = this.formulaireForm.get('stabilite').value;
      project.comment = this.formulaireForm.get('comment').value;
      this.subscriptions.add(this.projectService.saveFormulaire(project, this.idClient).subscribe(ok => {
      }, response => {
        if (response.status == 200) {
          this.goNext.emit(true);
        } else {
          this.toastr.error("Une erreur est survenu ","Projet");
        }
      }));

    }));

  }
}
