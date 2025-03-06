import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaxCalculatorService } from '../services/tax-calculator.service';
import { BehaviorSubject, delay, finalize, Observable, Subject, take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaxCalculationResultComponent } from '../tax-calculation-result/tax-calculation-result.component';
import { TaxResultDto } from '../models/tax-result-dto';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-tax-calculator',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatButtonModule, FormsModule, ReactiveFormsModule, JsonPipe, AsyncPipe, TaxCalculationResultComponent],
  templateUrl: './tax-calculator.component.html',
  styleUrl: './tax-calculator.component.scss',
})
export class TaxCalculatorComponent {
  constructor(private readonly _service: TaxCalculatorService) { }

  private readonly _destroyRef = inject(DestroyRef);

  readonly annualGrossSalary = new FormControl<number | null>(null, [Validators.required, Validators.min(0)]);
  readonly taxCalculationResult$: Subject<TaxResultDto | undefined> = new Subject();
  readonly isSubmitting$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  onCalcButtonClick() {
    if (!this.isSubmitting$.value && this.annualGrossSalary.valid && this.annualGrossSalary.value) {
      this.isSubmitting$.next(true);
      this._service.calculateTax(this.annualGrossSalary.value).pipe(
        takeUntilDestroyed(this._destroyRef)
        , take(1)
        , finalize(() => this.isSubmitting$.next(false))
      ).subscribe({
        next: (data) => this.taxCalculationResult$?.next(data),
        error: (err) => console.error('Tax calculation failed', err)
      })
    }
  }
}
