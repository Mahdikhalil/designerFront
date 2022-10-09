import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProjectService} from '../../services/ProjectService';
import {Project} from '../../entities/project';
import {Router} from '@angular/router';

@Component({
  selector: 'app-information-step',
  templateUrl: './information-step.component.html',
  styleUrls: ['./information-step.component.css']
})
export class InformationStepComponent implements OnInit {

  @Output() firstIsDone = new EventEmitter();

  informationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private router: Router,) {
  }

  ngOnInit(): void {

    if (!(localStorage.getItem('token') === 'true')) {
      this.router.navigate(['/login']);
    }

    this.informationForm = this.formBuilder.group({
      idClient: [],
      adresse: [],
      clientName: [],
      frontLength: [],
      frontHeight: [],
    });
  }

  next() {

    let project: Project = new Project();
    project.idClient = this.informationForm.get('idClient').value;
    project.adresse = this.informationForm.get('adresse').value;
    project.clientName = this.informationForm.get('clientName').value;
    project.frontHeight = this.informationForm.get('frontHeight').value;
    project.frontLength = this.informationForm.get('frontLength').value;
    this.projectService.saveOrUpdateProject(project).subscribe(ok => {
    },response =>{
      if(response.status == 200){
        this.firstIsDone.emit(this.informationForm.get('idClient').value);
        confirm("Information sauvegarder ");
      }else{
        alert("Une erreur est survenu ");
      }
    });

  }

}
