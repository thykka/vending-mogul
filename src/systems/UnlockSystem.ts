import { System, World } from '@jakeklassen/ecs';
import { UnlockAction } from '@components/UnlockAction';
import { Locked } from '@components/Locked';
import { BuyAction } from '@components/BuyAction';
import { Paid } from '@components/Paid';
import { Money } from '@components/Money';
import { spawnActionError } from '@factories/Action-factory';

export class UnlockSystem extends System {
  constructor() {
    super();
  }

  update(world: World, dt: number) {
    for (const [_action, components] of world.view(UnlockAction)) {
      const purchase = components.get(BuyAction);
      // Purchased unlocks only go through once MoneySystem has charged for them
      if (purchase && !components.get(Paid)) continue;
      const { target } = components.get(UnlockAction);
      if (world.getEntityComponents(target)?.get(Locked)) {
        world.removeEntityComponents(target, Locked);
        continue;
      }
      // Already unlocked, e.g. by another purchase in the same update
      if (purchase) this.refund(world, purchase);
      spawnActionError(world, 'unlockNotLocked', {});
    }
  }

  refund(world: World, { buyer, cost }: BuyAction) {
    const money = world.getEntityComponents(buyer)?.get(Money);
    if (money) money.value += cost;
  }
}
