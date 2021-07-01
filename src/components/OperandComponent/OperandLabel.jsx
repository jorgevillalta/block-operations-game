import styled from 'styled-components/macro';
import { useOperationContext } from '../../context/OperationContext';
import { ThumbUpWhite, DoneWhite, CloseWhite } from '../../icons';

const circleSizePx = 118;
const circleBorderPx = 5;

const handleOperandStatusColor = ({ status, colors }) => {
  if (status === 'success') {
    return colors.success;
  }
  if (status === 'error') {
    return colors.error;
  }
  return colors.primary;
};

const StyledMainComponent = styled.div`
  && {
    position: relative;

    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
  }
`;

const StyledDivPanel = styled.div`
  && {
    position: absolute;

    cursor: pointer;
    user-select: none;

    margin-top: -${circleSizePx / 2 + circleBorderPx}px;

    display: flex;
    flex-direction: column;
    align-items: center;

    border: ${circleBorderPx}px solid;
    border-color: ${({ status, theme }) =>
      handleOperandStatusColor({ status, colors: theme.colors })};
    border-radius: 50%;

    width: ${circleSizePx}px;
    height: ${circleSizePx}px;
  }
`;

const StyledResultNumberContainer = styled(StyledDivPanel)`
  && {
    justify-content: center;
    background-color: white; // move color to theme
  }
`;

const StyledResultNumberText = styled.p`
  && {
    color: ${({ theme }) => theme.colors.textPrimary};

    font-size: 68px;
    margin-top: 0.6em;
  }
`;

const StyledIndicatorContainer = styled(StyledDivPanel)`
  && {
    justify-content: flex-end;
    background-color: ${({ status, theme }) =>
      handleOperandStatusColor({ status, colors: theme.colors })};

    clip-path: inset(70% 0 0 0);

    & > * {
      margin-bottom: 3px;
      height: 26px;
    }
  }
`;

const OperandLabel = ({ hidden }) => {
  const {
    operandTarget,
    isOperandTargetVerified,
    setOperandTargetVerified,
    getOperandTargetStatus
  } = useOperationContext();

  const handleIndicatorClick = () =>
    setOperandTargetVerified({ operandTargetVerified: !isOperandTargetVerified });

  const Icon =
    getOperandTargetStatus() === 'success'
      ? DoneWhite
      : getOperandTargetStatus() === 'error'
      ? CloseWhite
      : ThumbUpWhite;

  const resultNumberText = getOperandTargetStatus() !== 'success' && hidden ? '?' : operandTarget;

  return (
    <StyledMainComponent>
      <StyledResultNumberContainer status={getOperandTargetStatus()} onClick={handleIndicatorClick}>
        <StyledResultNumberText>{resultNumberText}</StyledResultNumberText>
      </StyledResultNumberContainer>
      <StyledIndicatorContainer status={getOperandTargetStatus()} onClick={handleIndicatorClick}>
        <Icon />
      </StyledIndicatorContainer>
    </StyledMainComponent>
  );
};

export default OperandLabel;
