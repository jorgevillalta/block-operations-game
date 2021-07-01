import OperationMainPanel from '../components/OperationMainPanel';
import { useOperationFactory } from '../hooks';
import { NavigationButtonContainer } from '../components/NavigationButtonContainer';
import { RefreshBlack } from '../icons';
import { ActionButton } from './../blocks/ActionButton';
import {
  OperationPageLayout,
  OperationPageHeader,
  OperationPageFooter,
  OperationPageBody
} from '../blocks/OperationPageLayout';

export const OperationPage = () => {
  const [operation, nextOperation] = useOperationFactory('+');

  return (
    <OperationPageLayout>
      <OperationPageHeader>
        <NavigationButtonContainer />
      </OperationPageHeader>
      <OperationPageBody>
        <OperationMainPanel operation={operation} />
      </OperationPageBody>
      <OperationPageFooter>
        <ActionButton icon={RefreshBlack} onClick={() => nextOperation()} />
      </OperationPageFooter>
    </OperationPageLayout>
  );
};
