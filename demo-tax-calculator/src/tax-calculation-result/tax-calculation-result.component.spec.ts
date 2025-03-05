import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxCalculationResultComponent } from './tax-calculation-result.component';

describe('TaxCalculationResultComponent', () => {
  let component: TaxCalculationResultComponent;
  let fixture: ComponentFixture<TaxCalculationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxCalculationResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxCalculationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
