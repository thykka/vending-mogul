import { System, World } from '@jakeklassen/ecs';
import { Money } from '@components/Money';
import { BuyAction } from '@components/BuyAction';
import { Paid } from '@components/Paid';
import { spawnActionError } from '@factories/Action-factory';

/** Charges buyers for BuyActions and marks the ones they can afford as Paid. */
export class MoneySystem extends System {
  constructor() {
    super();
  }

  update(world: World, dt: number) {
    for (const [entity, components] of world.view(BuyAction)) {
      const { buyer, cost } = components.get(BuyAction);
      const buyerComponents = world.getEntityComponents(buyer);
      if (!buyerComponents) {
        spawnActionError(world, 'noEntity', { entity: buyer });
        continue;
      }
      const money = buyerComponents.get(Money);
      if (!money) {
        spawnActionError(world, 'buyNoMoney', {});
        continue;
      }
      if (money.value < cost) {
        spawnActionError(world, 'buyNotEnoughMoney', {
          amount: cost - money.value,
        });
        continue;
      }
      money.value -= cost;
      world.addEntityComponents(entity, new Paid());
    }
  }
}
