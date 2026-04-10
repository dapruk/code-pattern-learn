import { useSyncExternalStore } from 'react';

export interface GenericBloc<S> {
  getState: () => S;
  subscribe: (listener: () => void) => () => void;
}

export function useBloc<S>(bloc: GenericBloc<S>): S {
  return useSyncExternalStore(bloc.subscribe, bloc.getState);
}
