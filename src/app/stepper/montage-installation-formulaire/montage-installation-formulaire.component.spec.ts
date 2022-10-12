import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontageInstallationFormulaireComponent } from './montage-installation-formulaire.component';

describe('MontageInstallationFormulaireComponent', () => {
  let component: MontageInstallationFormulaireComponent;
  let fixture: ComponentFixture<MontageInstallationFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontageInstallationFormulaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MontageInstallationFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
