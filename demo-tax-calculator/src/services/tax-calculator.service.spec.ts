import { TestBed } from '@angular/core/testing';

import { TaxCalculatorService } from './tax-calculator.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../environment/environment';
import { TaxResultDto } from '../models/tax-result-dto';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('TaxCalculatorService', () => {
  let service: TaxCalculatorService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxCalculatorService,provideHttpClient(), provideHttpClientTesting()]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(TaxCalculatorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculateTax', () => {

    it('should make a POST request to calculate tax in production mode', () => {
      environment.isDevelopment = false; // simulate production environment

      const mockAnnualGrossSalary = 60000;
      const expectedUrl = `${environment.apiUrl}/TaxCalculator/CalculateTax`;

      service.calculateTax(mockAnnualGrossSalary).subscribe();

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: expectedUrl
      });
      expect(req.request.body).toEqual({ grossSalary: mockAnnualGrossSalary });
      req.flush({} as TaxResultDto);
    });

  });

});
