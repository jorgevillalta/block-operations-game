import styled, { css } from 'styled-components/macro';

export const OperationPanel = styled.div`
  && {
    position: relative;
  }
`;

export const OperationSymbolContainer = styled.div`
  && {
  }
`;

export const OperationSymbolPanel = styled.div`
  && {
    position: absolute;
    ${({ arithmeticSymbol }) =>
      arithmeticSymbol &&
      css`
        left: 33%;
        transform: translateX(-49%);
      `}
    ${({ equalSymbol }) =>
      equalSymbol &&
      css`
        right: 33%;
        transform: translateX(49%);
      `}

    height: 128px; // size of the operand label

    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    cursor: default;
  }
`;

export const OperationSymbolComponent = styled.div`
  && {
    font-size: 48px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: white;

    width: 64px;
    height: 64px;

    border: 5px solid;
    border-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const OperationContainer = styled.div`
  && {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.3%;
  }
`;
