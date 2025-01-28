import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {}
  calculate(operand1: number, operand2: number, operator: string): number {
    switch (operator) {
      case '+':
        return operand1 + operand2;
      case '-':
        return operand1 - operand2;
      case '*':
        return operand1 * operand2;
      case '/':
        return operand2 !== 0 ? operand1 / operand2 : NaN;
      default:
        return NaN;
    }
  }
}
