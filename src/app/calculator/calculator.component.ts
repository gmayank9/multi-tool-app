import { Component, inject } from '@angular/core';
import { CalculatorService } from './calculator.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  display: string = '';
  previousValue: string = '';
  operator: string = '';
  storedResults: number[] = [];
  private calculatorService = inject(CalculatorService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadStoredResults();
  }

  appendToDisplay(value: string): void {
    this.display += value;
  }

  clearDisplay(): void {
    this.display = '';
    this.previousValue = '';
    this.operator = '';
  }

  setOperator(operator: string): void {
    if (this.previousValue && this.display) {
      this.operator = operator;
    } else if (this.display) {
      this.previousValue = this.display;
      this.operator = operator;
      this.display = '';
    } else if (!this.display && this.operator) {
      this.operator = operator;
    }
  }
  calculateResult(): void {
    if (this.previousValue && this.display && this.operator) {
      const operand1 = parseFloat(this.previousValue);
      const operand2 = parseFloat(this.display);
      const result = this.calculatorService.calculate(
        operand1,
        operand2,
        this.operator
      );

      this.display = result.toString();
      this.previousValue = '';
      this.operator = '';
      this.storeResult(result);
    }
  }
  private storeResult(result: number): void {
    this.storedResults.push(result);
    localStorage.setItem(
      'calculatorResults',
      JSON.stringify(this.storedResults)
    );
  }
  private loadStoredResults(): void {
    const stored = localStorage.getItem('calculatorResults');
    if (stored) {
      this.storedResults = JSON.parse(stored);
    }
  }
  clearStoredResults(): void {
    this.storedResults = [];
    localStorage.removeItem('calculatorResults');
  }
  gotoHome() {
    this.router.navigate(['']);
  }
}
