import { useEffect } from 'react';
import styled from 'styled-components/macro';
import { BlockTypes } from '../../constants/BlockTypes';
import { useOperationContext } from '../../context/OperationContext';
import OperandBlockColumn from './OperandBlockColumn';
import OperandBlockContainer from './OperandBlockContainer';
import OperandBlockGenerator from './OperandBlockGenerator';
import OperandLabel from './OperandLabel';

const resultHeightPx = 128;

const handleOperandStatusColor = ({ status, colors }) => {
  if (status === 'success') {
    return colors.success;
  }
  if (status === 'error') {
    return colors.error;
  }
  return colors.default;
};

const StyledMainComponent = styled.div`
  && {
    display: grid;
    grid-template-rows: ${resultHeightPx / 2}px auto;
    gap: 1.5%;

    margin-top: ${resultHeightPx / 2}px;
    padding: 0 8px 8px 8px;

    border: 4px solid;
    border-radius: 15px;
    border-color: ${({ status, theme }) =>
      handleOperandStatusColor({ status, colors: theme.colors })};
  }
`;

const StyledBlockNumberPanel = styled.div`
  && {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-end;

    height: 100%;

    & > *:not(:last-child) {
      margin-right: 8px;
    }
  }
`;

const StyledBlockNumberPanelChild = styled.div`
  && {
    height: 100%;
  }
`;

const StyledBlockNumberPanelChildTens = styled(StyledBlockNumberPanelChild)`
  && {
    width: 70%;
  }
`;

const StyledBlockNumberPanelChildUnits = styled(StyledBlockNumberPanelChild)`
  && {
    width: 30%;
  }
`;

/** */
const OperandComponent = ({ value = 0, hiddenLabel = false }) => {
  const { reset, setOperandTarget, getOperandTargetStatus } = useOperationContext();

  useEffect(() => {
    reset();
    setOperandTarget({ operandTarget: value });
  }, [reset, setOperandTarget, value]);

  return (
    <StyledMainComponent status={getOperandTargetStatus()}>
      <OperandLabel hidden={hiddenLabel} />
      <StyledBlockNumberPanel>
        <StyledBlockNumberPanelChildTens>
          <OperandBlockColumn
            container={<OperandBlockContainer blockType={BlockTypes.TEN} />}
            generator={<OperandBlockGenerator blockType={BlockTypes.TEN} />}
          />
        </StyledBlockNumberPanelChildTens>
        <StyledBlockNumberPanelChildUnits>
          <OperandBlockColumn
            container={<OperandBlockContainer blockType={BlockTypes.UNIT} />}
            generator={<OperandBlockGenerator blockType={BlockTypes.UNIT} />}
          />
        </StyledBlockNumberPanelChildUnits>
      </StyledBlockNumberPanel>
    </StyledMainComponent>
  );
};

export default OperandComponent;
