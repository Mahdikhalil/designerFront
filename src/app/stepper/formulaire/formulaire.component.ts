import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectService} from "../../services/ProjectService";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Project} from "../../entities/project";
import {ConclutionComponent} from "./conclution/conclution.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

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


    this.projectService.idClient$.subscribe(idPro => {
      this.idClient = idPro;
      this.projectService.getProjectByIdClient(idPro).subscribe(project => {
        this.project = project;
        this.settingsValues();
      });
    });

  }

  settingsValues(){
    if(this.project != null){
      this.formulaireForm.get('implantation').value.setValue(this.project.implantation);
      this.formulaireForm.get('appuisAndCalages').value.setValue(this.project.appuisAndCalages);
      this.formulaireForm.get('conception').value.setValue(this.project.conception);
      this.formulaireForm.get('amenagements').value.setValue(this.project.amenagements);
      this.formulaireForm.get('chargement').value.setValue(this.project.chargement);
      this.formulaireForm.get('stabilite').value.setValue(this.project.stabilite);
      this.formulaireForm.get('comment').value.setValue(this.project.comment);
    }
  }

  previous() {
    this.goBack.emit(true);
  }

  next() {
    this.projectService.idClient$.subscribe(idClient => {
      this.idClient = idClient;
      let project: Project = new Project();
      project.implantation = this.formulaireForm.get('implantation').value;
      project.appuisAndCalages = this.formulaireForm.get('appuisAndCalages').value;
      project.conception = this.formulaireForm.get('conception').value;
      project.amenagements = this.formulaireForm.get('amenagements').value;
      project.chargement = this.formulaireForm.get('chargement').value;
      project.stabilite = this.formulaireForm.get('stabilite').value;
      project.comment = this.formulaireForm.get('comment').value;
      this.projectService.saveFormulaire(project, this.idClient).subscribe(ok => {
      }, response => {
        if (response.status == 200) {
          this.goNext.emit(true);
        } else {
          this.toastr.error("Une erreur est survenu ");
        }
      });

    });

  }
}
