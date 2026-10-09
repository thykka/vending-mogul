import { System, World } from '@jakeklassen/ecs';
import { UnlockAction } from '@components/UnlockAction';
import { Locked } from '@components/Locked';
import { BuyAction } from '@components/BuyAction';
import { Paid } from '@components/Paid';

export class UnlockSystem extends System {
  constructor() {
    super();
  }

  update(world: World, dt: number) {
    for (const [action, components] of world.view(UnlockAction)) {
      // Purchased unlocks only go through once MoneySystem has charged for them
      if (components.get(BuyAction) && !components.get(Paid)) continue;
      const { target } = components.get(UnlockAction);
      world.removeEntityComponents(target, Locked);
    }
  }
}
