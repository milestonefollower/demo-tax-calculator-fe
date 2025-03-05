import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../environment/environment';
import { TaxResultDto } from '../models/tax-result-dto';

@Injectable({
  providedIn: 'root'
})
export class TaxCalculatorService {

  constructor(private http: HttpClient) { }

  calculateTax(annualGrossSalary: number): Observable<TaxResultDto> {
    return environment.isDevelopment
      ? of(this.createMockData(annualGrossSalary)).pipe(delay(2000))
      : this.http.post<TaxResultDto>(environment.apiUrl + '/TaxCalculator/CalculateTax', { annualGrossSalary });
  }


  private createMockData(annualGrossSalary: number): TaxResultDto {
    return {
      annualGrossSalary: annualGrossSalary,
      annualNetSalary: 12312313,
      annualTaxPaid: 32324,
      monthlyGrossSalary: 12,
      monthlyNetSalary: 33,
      monthlyTaxPaid: 42.42
    } as TaxResultDto
  }
}
