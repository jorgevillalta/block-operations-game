import { OperationProvider } from '../context/OperationContext';
import OperandComponent from './OperandComponent';
import { OperationPanel, OperationContainer } from '../blocks/OperationPanel';

/** */
const OneOperandMainPanel = ({ operand }) => {
  return (
    <OperationPanel>
      <OperationContainer>
        <div></div>
        <OperationProvider>
          <OperandComponent value={operand} />
        </OperationProvider>
        <div></div>
      </OperationContainer>
    </OperationPanel>
  );
};

export default OneOperandMainPanel;
