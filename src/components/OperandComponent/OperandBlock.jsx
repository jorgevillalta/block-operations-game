import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { BlockComponent } from '../../blocks/BlockComponent';

const OperandBlock = ({
  blockType,
  blockSize,
  componentType,
  orientation,
  onDragging,
  onDragEnds
}) => {
  //
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: blockType,
      item: { blockType, blockSize, componentType },
      collect: (monitor, props) => ({
        isDragging: !!monitor.isDragging()
      }),
      end: () => {
        onDragEnds({ blockType, blockSize, componentType });
      }
    }),
    [blockType, blockSize, componentType]
  );

  //
  useEffect(() => {
    isDragging && onDragging({ blockType, blockSize, componentType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockType, blockSize, componentType, isDragging]);

  return <BlockComponent ref={drag} type={blockType} size={blockSize} orientation={orientation} />;
};

export default React.memo(OperandBlock);
