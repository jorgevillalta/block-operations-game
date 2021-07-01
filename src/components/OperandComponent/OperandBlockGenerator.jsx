import { useDrop } from 'react-dnd';
import styled from 'styled-components/macro';
import { handleBlockColor } from '../../blocks/BlockComponent';
import { handleContainerBgColor } from '../../blocks/BlockContainer';
import { BlockSizes, BlockTypes, ComponentTypes } from '../../constants';
import { useOperationContext } from '../../context/OperationContext';
import { useContainerSelection, useContainerDrag } from '../../hooks';

import OperandBlock from './OperandBlock';

const StyledPanel = styled.div`
  && {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border: 3px ${({ isSelected }) => (isSelected ? 'dashed' : 'solid')}
      ${({ size, theme }) => handleBlockColor({ size, colors: theme.colors })};
    border-radius: 15px;

    background-color: ${({ size, isSelected, theme }) =>
      isSelected ? handleContainerBgColor({ size, colors: theme.colors }) : 'transparent'};

    padding: 10px;

    opacity: ${({ isDragging }) => (isDragging ? 0.3 : 1)};
  }
`;

/** */
const OperandBlockGenerator = ({ blockType, onDragDropEvent }) => {
  //
  const componentType = ComponentTypes.GENERATOR;

  //
  const { isDragging, dragStarts, dragEnds, dropEnds } = useOperationContext();

  //
  const [, drop] = useDrop(
    () => ({
      accept: [BlockTypes.TEN, BlockTypes.UNIT],
      drop: (item) => {
        dropEnds({ blockType, componentType, item });
      }
    }),
    [blockType]
  );

  //
  const { isContainerSelected } = useContainerSelection({
    source: isDragging,
    target: { blockType, componentType }
  });

  const { isContainerDragging } = useContainerDrag({
    source: isDragging,
    target: { blockType, componentType }
  });

  //
  const handleDragEnds = (item) => dragEnds({ item });
  const handleDragging = (item) => dragStarts({ item });
  const blockSize = blockType === BlockTypes.TEN ? BlockSizes.TEN : BlockSizes.UNIT;

  return (
    <StyledPanel
      ref={drop}
      size={blockSize}
      isDragging={isContainerDragging}
      isSelected={isContainerSelected}>
      <OperandBlock
        orientation="row"
        blockType={blockType}
        blockSize={blockSize}
        componentType={componentType}
        onDragging={handleDragging}
        onDragEnds={handleDragEnds}
      />
    </StyledPanel>
  );
};

export default OperandBlockGenerator;
