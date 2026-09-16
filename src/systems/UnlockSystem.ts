import { System, World } from '@jakeklassen/ecs';
import { UnlockAction } from '../components/UnlockAction';
import { Locked } from '../components/Locked';

export class UnlockSystem extends System {
  constructor() {
    super();
  }

  update(world: World, dt: number) {
    for (const [action, components] of world.view(UnlockAction)) {
      const { target } = components.get(UnlockAction);
      world.removeEntityComponents(target, Locked);
    }
  }
}
