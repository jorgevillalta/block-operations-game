import { useState } from 'react';
import { OperandFactory } from '../logic/Operand';

//
const operandFactory = new OperandFactory();

/** */
export function useOperandFactory() {
  const [operand, setOperand] = useState(() => {
    return operandFactory.nextOperand();
  });
  const nextOperand = () => setOperand(operandFactory.nextOperand());

  return [operand, nextOperand];
}
