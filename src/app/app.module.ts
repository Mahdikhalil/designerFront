import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StepperComponent } from './stepper/stepper.component';
import { AppRoutingModule } from './app-routing.module';
import { InformationStepComponent } from './stepper/information-step/information-step.component';
import {PhotosStepComponent} from './stepper/photos-step/photos-step.component';
import { PhotoComponent } from './stepper/photos-step/photo/photo.component';
import { FormulaireComponent } from './stepper/formulaire/formulaire.component';
import { ConclutionComponent } from './stepper/formulaire/conclution/conclution.component';
import { AdequationFormulaireComponent } from './stepper/adequation-formulaire/adequation-formulaire.component';
import { MontageInstallationFormulaireComponent } from './stepper/montage-installation-formulaire/montage-installation-formulaire.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StepperComponent,
    InformationStepComponent,
    PhotosStepComponent,
    PhotoComponent,
    FormulaireComponent,
    ConclutionComponent,
    AdequationFormulaireComponent,
    MontageInstallationFormulaireComponent,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
