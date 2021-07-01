import styled from 'styled-components/macro';

export const OperationPageLayout = styled.div`
  && {
    display: grid;
    grid-template-rows: 1fr 8fr 1.5fr;
    gap: 1.5%;
  }
`;

export const OperationPageHeader = styled.div`
  && {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2%;

    & > * {
    }
  }
`;

export const OperationPageBody = styled.div`
  && {
  }
`;

export const OperationPageFooter = styled.div`
  && {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-content: center;

    width: 100%;
  }
`;
