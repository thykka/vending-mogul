import type { Component, ComponentConstructor } from '@jakeklassen/ecs';
import { useGame } from '@ui/context/GameContext';
import { notifyListeners } from '@/game';

export function useGameMutate() {
  const game = useGame();
  return {
    removeComponents: (
      entity: number,
      ...components: ComponentConstructor[]
    ) => {
      game.removeEntityComponents(entity, ...components);
      notifyListeners();
    },
    addComponents: (entity: number, ...components: Component[]) => {
      game.addEntityComponents(entity, ...components);
      notifyListeners();
    },
  };
}
