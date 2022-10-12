import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdequationFormulaireComponent } from './adequation-formulaire.component';

describe('AdequationFormulaireComponent', () => {
  let component: AdequationFormulaireComponent;
  let fixture: ComponentFixture<AdequationFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdequationFormulaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdequationFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
