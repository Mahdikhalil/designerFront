import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConclutionComponent } from './conclution.component';

describe('ConclutionComponent', () => {
  let component: ConclutionComponent;
  let fixture: ComponentFixture<ConclutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConclutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConclutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
