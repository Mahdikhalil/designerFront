import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectService} from "../../services/ProjectService";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Project} from "../../entities/project";
import {ConclutionComponent} from "./conclution/conclution.component";

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

  constructor(private projectService: ProjectService,
              private formBuilder: FormBuilder,
              private router: Router,
  ) {
  }

  ngOnInit(): void {

    this.projectService.idClient$.subscribe(idPro => {
      this.idClient = idPro;
    });

    this.formulaireForm = this.formBuilder.group({
      implantation: [],
      appuisAndCalages: [],
      conception: [],
      amenagements: [],
      chargement: [],
      stabilite: [],
      comment: [],
    });

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
      });
      this.goNext.emit(true);
    });

  }
}
