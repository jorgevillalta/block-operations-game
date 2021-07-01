import styled from 'styled-components/macro';
import { BlockTypes } from '../constants/BlockTypes';

const containerHeight = '231px';

//
export const handleContainerBorderColor = ({ type, colors }) => {
  switch (type) {
    case BlockTypes.UNIT:
      return colors.blockBlue;
    case BlockTypes.TEN:
      return colors.blockRed;
    default:
      return '';
  }
};

//
export const handleContainerBgColor = ({ type, colors }) => {
  switch (type) {
    case BlockTypes.UNIT:
      return colors.blockBlueLight;
    case BlockTypes.TEN:
      return colors.blockRedLight;
    default:
      return '';
  }
};

/** */
const BasicBlockContainer = styled.div`
  && {
    display: flex;
    flex-direction: ${({ type }) => (type === BlockTypes.UNIT ? 'column' : 'row')};
    flex-wrap: wrap-reverse;
    justify-content: flex-end;
    align-items: flex-end;
    align-content: flex-start;

    border: 3px dashed
      ${({ type, isSelected, theme }) =>
        isSelected ? handleContainerBorderColor({ type, colors: theme.colors }) : 'transparent'};
    border-radius: 15px;

    background-color: ${({ type, isSelected, theme }) =>
      isSelected ? handleContainerBgColor({ type, colors: theme.colors }) : 'transparent'};

    height: ${containerHeight};

    & > * {
      flex: 0 1 auto;
    }
  }
`;

/** */
export const BlockContainer = styled(BasicBlockContainer)``;
