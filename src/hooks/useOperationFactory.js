import { useState } from 'react';
import { OperationFactory } from '../logic/Operation';

//
const operationFactory = new OperationFactory();

/** */
export function useOperationFactory(symbol) {
  const [operation, setOperation] = useState(() => {
    return operationFactory.nextOperation(symbol);
  });
  const nextOperation = () => setOperation(operationFactory.nextOperation(symbol));

  return [operation, nextOperation];
}
