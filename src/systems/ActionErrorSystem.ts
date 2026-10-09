import { System, World } from '@jakeklassen/ecs';
import { ActionError } from '@components/ActionError';
import { Timer } from '@components/Timer';

/** Removes ActionErrors once their Timer completes. */
export class ActionErrorSystem extends System {
  constructor() {
    super();
  }

  update(world: World, dt: number) {
    for (const [entity, components] of world.view(ActionError, Timer)) {
      if (components.get(Timer).completed) world.deleteEntity(entity);
    }
  }
}
