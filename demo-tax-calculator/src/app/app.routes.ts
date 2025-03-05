import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'tax', loadComponent: () => import('../tax-calculator/tax-calculator.component').then(x => x.TaxCalculatorComponent)
    },
];
