import { randomNumberFromInterval } from './randomNumbers';

export class Operation {
  constructor(symbol, ...operandList) {
    this.symbol = symbol;
    this.operandList = operandList;
  }

  getResult() {
    return this.operandList.reduce((a, b) => this._operate(a, this.symbol, b), 0);
  }

  getOperand(index) {
    return this.operandList[index];
  }

  _operate(a, symbol, b) {
    if (symbol === '+') {
      return a + b;
    }
    if (symbol === '-') {
      return a - b;
    }
  }

  isEqual(opB) {
    return JSON.stringify(this.operandList.sort()) === JSON.stringify(opB.sort());
  }
}

export class OperationFactory {
  constructor() {
    this.operationList = [];
  }

  nextOperation(symbol) {
    const operation = this._getValidOperation(symbol);
    this.operationList = [...this.operationList, operation];

    return operation;
  }

  _getRandomValidNumber() {
    return randomNumberFromInterval(10, 98);
  }

  _getValidOperation(symbol) {
    let a, b;

    do {
      a = this._getRandomValidNumber();
      b = this._getRandomValidNumber();
    } while (a + b >= 100);

    return new Operation(symbol, a, b);
  }
}
