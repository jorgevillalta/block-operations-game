import { randomNumberFromInterval } from './randomNumbers';

export class OperandFactory {
  constructor() {
    this.operandList = [];
  }

  nextOperand() {
    const operand = this._getValidOperand();
    this.operandList = [...this.operandList, operand];

    return operand;
  }

  _getRandomValidNumber() {
    return randomNumberFromInterval(10, 99);
  }

  _getValidOperand() {
    let a;

    do {
      a = this._getRandomValidNumber();
    } while (a >= 100);

    return a;
  }
}
