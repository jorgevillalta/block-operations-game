import styled, { css } from 'styled-components/macro';
import { BlockSizes } from '../constants';

const shortSide = '25px';
const longSide = '107px';

//
export const handleBlockOrientation = ({ orientation = 'column', size }) => {
  switch (size) {
    case BlockSizes.UNIT:
      return css`
        height: ${shortSide};
        width: ${shortSide};
      `;
    case BlockSizes.TEN:
      if (orientation === 'row') {
        return css`
          height: ${shortSide};
          width: ${longSide};
        `;
      } else {
        return css`
          height: ${longSide};
          width: ${shortSide};
        `;
      }
    default:
      return <div></div>;
  }
};

//
export const handleBlockColor = ({ size, colors }) => {
  switch (size) {
    case BlockSizes.UNIT:
      return `${colors.blockBlue}`;
    case BlockSizes.TEN:
      return `${colors.blockRed}`;
    default:
      return '';
  }
};

//
export const handleBlockBgColor = (props) => {
  return css`
    background-color: ${handleBlockColor(props)};
  `;
};

/** */
const BasicBlockComponent = styled.div`
  margin: 4px;
`;

/**
 * BlockComponent
 *
 * Props:
 * orientation: column | row
 * size: BlockSizes
 * type: BlockTypes
 * theme: Theme
 */
export const BlockComponent = styled(BasicBlockComponent)`
  ${(props) => handleBlockOrientation(props)};
  ${(props) => handleBlockBgColor({ ...props, ...props.theme })};
`;
