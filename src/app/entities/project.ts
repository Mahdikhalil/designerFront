import {Photo} from "./photo";

export class Project {

  id?: string;
  idClient: string;
  adresse: string;
  clientName: string;
  frontLength: string;
  frontHeight: string;
  schemaOfPrincipPhoto: string;

  photosComment: Photo;

  implantation: string;
  appuisAndCalages: string;
  conception: string;
  amenagements: string;
  chargement: string;
  stabilite: string;
  comment: string;

  conclusion: string;

  natureOfWork: string;
  surchagePonctuelleEventuelle:boolean;
  poidsSurcharge : string;
  hauteurSurcharge: string;
  marqueEchaffodage: string;
  typeEchafaudage: string;
  classeEchaffodage: string;
  chargeAdmissibleEchafodage: string;
  longueurDimensions: string;
  hauteurDimensions: string;
  largeurDimensions: string;
  premierNiveau: string;
  nombreNiveau : string;
  nombreTramDacces: string;
  typeAccesPlancheurTravail: string;
  echafaudageApproprieAusTravauxRealiser: string;

  supportImplantation: string;
  calages: string;
  supportAmarrage: string;
  nbrAncrageTheorique: string;
  nbrAncrageConstate: string;
  confirmiteDispositifsRepartitionsChargeSurAppuis: string;
  montageParticulie:boolean;
  lequelsMontageParticulie: string;
  presencePareGravats:boolean;
  presenceConsoles:boolean;
  largeursPresenceConsoles: string;
  echaufaudages: string;
  risqueElectrique:boolean;
  precautionRisqueElectrique: string;
  monteConformementNoticeDuFabriquant:boolean;
  monteConformementPlanMontage:boolean;
  presencePanneauxInformationChargeExploitation:boolean;
  noteCalculEtabliParPersonneCimpetente:boolean;

}
