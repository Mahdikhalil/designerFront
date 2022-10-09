import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {StepperComponent} from './stepper/stepper.component';
import {PhotosStepComponent} from './stepper/photos-step/photos-step.component';
import {PhotoComponent} from "./stepper/photos-step/photo/photo.component";
import {FormulaireComponent} from "./stepper/formulaire/formulaire.component";
import {InformationStepComponent} from "./stepper/information-step/information-step.component";
import {ConclutionComponent} from "./stepper/formulaire/conclution/conclution.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'stepper', component: StepperComponent},
  {path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
