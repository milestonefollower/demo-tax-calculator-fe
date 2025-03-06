import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxCalculatorComponent } from './tax-calculator.component';
import { provideHttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TaxCalculatorService } from '../services/tax-calculator.service';
import { of } from 'rxjs';
import { TaxResultDto } from '../models/tax-result-dto';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('TaxCalculatorComponent', () => {
  let component: TaxCalculatorComponent;
  let fixture: ComponentFixture<TaxCalculatorComponent>;
  let mockTaxCalculatorService: jasmine.SpyObj<TaxCalculatorService>;

  beforeEach(async () => {
    mockTaxCalculatorService = jasmine.createSpyObj('TaxCalculatorService', ['calculateTax']);
    await TestBed.configureTestingModule({
      imports: [TaxCalculatorComponent,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatButtonModule
      ],
      providers: [provideHttpClient(), { provide: TaxCalculatorService, useValue: mockTaxCalculatorService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TaxCalculatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call calculateTax when button clicked, valid form and not submitting', () => {
    const taxResultDto: TaxResultDto = {
      annualGrossSalary: 50000,
      annualNetSalary: 38000,
      annualTaxPaid: 12000,
      monthlyGrossSalary: 4166.67,
      monthlyNetSalary: 3166.67,
      monthlyTaxPaid: 1000
    };
    component.annualGrossSalary.setValue(50000);
    mockTaxCalculatorService.calculateTax.and.returnValue(of(taxResultDto));

    component.onCalcButtonClick();
    expect(mockTaxCalculatorService.calculateTax).toHaveBeenCalledOnceWith(50000);
  });

  it('should not call calculateTax when isSubmitting is true', () => {
    component.isSubmitting$.next(true);
    component.annualGrossSalary.setValue(50000);

    component.onCalcButtonClick();
    expect(mockTaxCalculatorService.calculateTax).not.toHaveBeenCalled();
  });

  it('should not call calculateTax when form is invalid', () => {
    component.annualGrossSalary.setValue(-100);

    component.onCalcButtonClick();
    expect(mockTaxCalculatorService.calculateTax).not.toHaveBeenCalled();
  });

  describe('TaxCalculatorComponent template', () => {
    function setInputValue(selector: string, value: any) {
      fixture.detectChanges();
      let input = fixture.debugElement.nativeElement.querySelector(selector);
      input.value = value;
      input.dispatchEvent(new Event('input'));
    }

    it('should display error for empty input', () => {
      setInputValue('input[name="annualGrossSalary"]', null);
      component.annualGrossSalary.markAsTouched();
      fixture.detectChanges();

      let errors = fixture.debugElement.nativeElement.querySelector('mat-error');
      expect(errors.innerText).toContain('required');
    });

    it('should display error for invalid gross annual salary', () => {
      setInputValue('input[name="annualGrossSalary"]', -500);
      component.annualGrossSalary.markAsTouched();
      fixture.detectChanges();
      let errors = fixture.debugElement.nativeElement.querySelector('mat-error');
      expect(errors.innerText).toContain('min');
    });

    it('should show spinner when isSubmitting is true', () => {
      component.isSubmitting$.next(true);
      fixture.detectChanges();

      let spinner = fixture.debugElement.nativeElement.querySelector('mat-spinner');
      expect(spinner).not.toBeNull();
    });

  })

});