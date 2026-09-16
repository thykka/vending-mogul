import { System, World } from '@jakeklassen/ecs';
import { UnlockPrice } from '../components/UnlockPrice';
import { Money } from '../components/Money';
import { BuyAction } from '../components/BuyAction';

export class MoneySystem extends System {
  constructor() {
    super();
  }

  update(world: World, dt: number) {
    for (const [entity, components] of world.view(BuyAction)) {
      const { buyer, buyable } = components.get(BuyAction);
      const buyerComponents = world.getEntityComponents(buyer);
      const buyableComponents = world.getEntityComponents(buyable);
      const money = buyerComponents.get(Money);
      if (!money) continue;
      const unlockCost = buyableComponents.get(UnlockPrice);
      if (!unlockCost) continue;
      if (money.value - unlockCost.value < 0) continue;
      money.value -= unlockCost.value;
    }
  }
}
