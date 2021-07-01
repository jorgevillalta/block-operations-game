import { useMemo } from 'react';

/**
 *
 * @param {object} params source and target
 * @returns object with selections info in real time
 */
export function useContainerDrag({ source, target }) {
  const isContainerDragging = useMemo(() => {
    if (!source) {
      return false;
    }

    return source.blockType === target.blockType && source.componentType === target.componentType;
  }, [source, target]);

  return { isContainerDragging };
}
