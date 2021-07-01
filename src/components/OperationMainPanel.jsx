import { OperationProvider } from '../context/OperationContext';
import OperandComponent from './OperandComponent';
import {
  OperationPanel,
  OperationSymbolContainer,
  OperationSymbolPanel,
  OperationSymbolComponent,
  OperationContainer
} from '../blocks/OperationPanel';

/** */
const OperationMainPanel = ({ operation }) => {
  return (
    <OperationPanel>
      <OperationSymbolContainer>
        <OperationSymbolPanel arithmeticSymbol>
          <OperationSymbolComponent>{operation.symbol}</OperationSymbolComponent>
        </OperationSymbolPanel>
        <OperationSymbolPanel equalSymbol>
          <OperationSymbolComponent>=</OperationSymbolComponent>
        </OperationSymbolPanel>
      </OperationSymbolContainer>
      <OperationContainer>
        <OperationProvider>
          <OperandComponent value={operation.getOperand(0)} />
        </OperationProvider>
        <OperationProvider>
          <OperandComponent value={operation.getOperand(1)} />
        </OperationProvider>
        <OperationProvider>
          <OperandComponent value={operation.getResult()} hiddenLabel />
        </OperationProvider>
      </OperationContainer>
    </OperationPanel>
  );
};

export default OperationMainPanel;
