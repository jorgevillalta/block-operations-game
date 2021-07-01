import { useDrop } from 'react-dnd';
import { BlockContainer } from '../../blocks/BlockContainer';
import { BlockSizes } from '../../constants';
import { BlockTypes } from '../../constants/BlockTypes';
import { ComponentTypes } from '../../constants/ComponentTypes';
import { useOperationContext } from '../../context/OperationContext';
import OperandBlock from './OperandBlock';
import { useBlocksCount, useContainerSelection } from '../../hooks';

/** */
const OperandBlockContainer = ({ blockType }) => {
  //
  const componentType = ComponentTypes.CONTAINER;

  //
  const { isDragging, blocksCount, dragStarts, dragEnds, dropEnds } = useOperationContext();

  //
  const [, drop] = useDrop(
    () => ({
      accept: [BlockTypes.TEN, BlockTypes.UNIT],
      drop: (item) => {
        dropEnds({ blockType, componentType, item });
      }
    }),
    [blockType, componentType]
  );

  //
  const { isContainerSelected } = useContainerSelection({
    source: isDragging,
    target: { blockType, componentType }
  });

  //
  const { blocksCountByType } = useBlocksCount({ blockType, blocksCount });

  //
  const handleDragEnds = (item) => dragEnds({ item });
  const handleDragging = (item) => dragStarts({ item });

  //
  const blocksGroupByTenCount = Math.trunc(blocksCountByType / 10);
  const blocksRest = blocksCountByType % 10;

  return (
    <div>
      <BlockContainer ref={drop} type={blockType} isSelected={isContainerSelected}>
        {Array.from(Array(blocksGroupByTenCount)).map((x, index) => (
          <OperandBlock
            key={index}
            blockType={blockType}
            blockSize={BlockSizes.TEN}
            componentType={componentType}
            onDragging={handleDragging}
            onDragEnds={handleDragEnds}
          />
        ))}
        {Array.from(Array(blocksRest)).map((x, index) => (
          <OperandBlock
            key={index}
            blockType={blockType}
            blockSize={BlockSizes.UNIT}
            componentType={componentType}
            onDragging={handleDragging}
            onDragEnds={handleDragEnds}
          />
        ))}
      </BlockContainer>
    </div>
  );
};

export default OperandBlockContainer;
