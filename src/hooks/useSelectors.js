import { useMemo } from 'react';

export function useSelectors(context, mapStateToSelectors) {
  const [state] = context;
  const selectors = useMemo(() => mapStateToSelectors(state), [state]); // eslint-disable-line

  return selectors;
}
