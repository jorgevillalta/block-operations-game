import { useMemo } from 'react';
import { BlockTypes } from '../constants';

/**
 *
 */
export function useBlocksCount({ blocksCount, blockType }) {
  const blocksCountByType = useMemo(
    () =>
      blockType === BlockTypes.TEN
        ? blocksCount.tens * 10
        : blockType === BlockTypes.UNIT
        ? blocksCount.units
        : null,
    [blockType, blocksCount]
  );

  return { blocksCountByType };
}
