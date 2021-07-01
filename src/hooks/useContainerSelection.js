import { useMemo } from 'react';
import { BlockSizes, BlockTypes, ComponentTypes } from '../constants';
import { BlocksLogicSwitchFactory } from '../logic/SwitchFactory';

//
const selectedBlocksLogicSwitchFactory = new BlocksLogicSwitchFactory()
  .addCase(
    {
      source: [ComponentTypes.GENERATOR, BlockTypes.UNIT],
      target: [ComponentTypes.CONTAINER, BlockTypes.UNIT]
    },
    () => true
  )
  .addCase(
    {
      source: [ComponentTypes.CONTAINER, BlockTypes.UNIT],
      target: [ComponentTypes.CONTAINER, BlockTypes.TEN]
    },
    ({ blockSize }) => blockSize === BlockSizes.TEN
  )
  .addCase(
    {
      source: [ComponentTypes.GENERATOR, BlockTypes.TEN],
      target: [ComponentTypes.CONTAINER, BlockTypes.TEN]
    },
    () => true
  )
  .addCase(
    {
      source: [ComponentTypes.CONTAINER, BlockTypes.UNIT],
      target: [ComponentTypes.GENERATOR, BlockTypes.UNIT]
    },
    ({ blockSize }) => blockSize === BlockSizes.UNIT
  )
  .addCase(
    {
      source: [ComponentTypes.CONTAINER, BlockTypes.TEN],
      target: [ComponentTypes.GENERATOR, BlockTypes.TEN]
    },
    () => true
  )
  .addCase(
    {
      source: [ComponentTypes.CONTAINER, BlockTypes.UNIT],
      target: [ComponentTypes.GENERATOR, BlockTypes.TEN]
    },
    ({ blockSize }) => blockSize === BlockSizes.TEN
  );

/**
 *
 * @param {object} params source and target
 * @returns object with selections info in real time
 */
export function useContainerSelection({ source, target }) {
  const isContainerSelected = useMemo(() => {
    if (!source) {
      return false;
    }

    return selectedBlocksLogicSwitchFactory.process(
      {
        source: [source.componentType, source.blockType],
        target: [target.componentType, target.blockType]
      },
      source
    );
  }, [source, target]);

  return { isContainerSelected };
}
