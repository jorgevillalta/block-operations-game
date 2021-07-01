import { useMemo } from 'react';

export function useActions(context, mapDispatchToActions) {
  const [, dispatch] = context;

  const actions = useMemo(() => mapDispatchToActions(dispatch), [dispatch]); // eslint-disable-line

  return actions;
}
