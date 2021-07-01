import styled from 'styled-components/macro';

const StyledBlockTypePanel = styled.div`
  && {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: flex-end;

    height: 100%;
    width: 100%;

    & > * {
      width: 100%;
    }

    & > *:not(:last-child) {
      margin-bottom: 5px;
    }
  }
`;

const StyledContainerChild = styled.div`
  // height: 50%;
`;

const StyledGeneratorChild = styled.div`
  height: 61px;
`;

/** */
const OperandBlockColumn = ({ container, generator }) => {
  return (
    <StyledBlockTypePanel>
      <StyledContainerChild>{container}</StyledContainerChild>
      <StyledGeneratorChild>{generator}</StyledGeneratorChild>
    </StyledBlockTypePanel>
  );
};

export default OperandBlockColumn;
