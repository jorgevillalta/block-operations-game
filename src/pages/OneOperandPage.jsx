import OneOperandMainPanel from '../components/OneOperandMainPanel';
import { RefreshBlack } from '../icons';
import { ActionButton } from '../blocks/ActionButton';
import { NavigationButtonContainer } from '../components/NavigationButtonContainer';
import {
  OperationPageLayout,
  OperationPageHeader,
  OperationPageFooter,
  OperationPageBody
} from '../blocks/OperationPageLayout';
import { useOperandFactory } from '../hooks';

export const OneOperandPage = () => {
  const [operand, nextOperand] = useOperandFactory('+');

  return (
    <OperationPageLayout>
      <OperationPageHeader>
        <NavigationButtonContainer />
      </OperationPageHeader>
      <OperationPageBody>
        <OneOperandMainPanel operand={operand} />
      </OperationPageBody>
      <OperationPageFooter>
        <ActionButton icon={RefreshBlack} onClick={() => nextOperand()} />
      </OperationPageFooter>
    </OperationPageLayout>
  );
};
