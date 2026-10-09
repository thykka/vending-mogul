import { useSyncExternalStore, useCallback, useRef } from 'react';
import { ComponentConstructor } from '@jakeklassen/ecs';
import { game, subscribeToGame } from '@/game';

export function useGameView<CC extends ComponentConstructor[]>(
  ...components: CC
) {
  const snapshotRef = useRef<ReturnType<typeof game.view>>([]);
  const dirtyRef = useRef(true);

  const subscribe = (notify: () => void) => {
    return subscribeToGame(() => {
      dirtyRef.current = true;
      notify();
    });
  };

  const getSnapshot = () => {
    if (dirtyRef.current) {
      snapshotRef.current = game.view(...components);
      dirtyRef.current = false;
    }
    return snapshotRef.current;
  };
  return useSyncExternalStore(subscribe, getSnapshot);
}
