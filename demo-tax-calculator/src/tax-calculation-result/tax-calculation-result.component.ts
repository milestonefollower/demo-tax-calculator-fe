import { Component, input, Input } from '@angular/core';
import { TaxResultDto } from '../models/tax-result-dto';
import { DecimalPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-tax-calculation-result',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './tax-calculation-result.component.html',
  styleUrl: './tax-calculation-result.component.scss'
})

export class TaxCalculationResultComponent {
  data = input.required<TaxResultDto>()

}
