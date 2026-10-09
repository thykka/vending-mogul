import { System, World } from '@jakeklassen/ecs';
import { UnlockPrice } from '@components/UnlockPrice';
import { Money } from '@components/Money';
import { BuyAction } from '@components/BuyAction';
import { spawnActionError } from '@factories/Action-factory';
import type { ErrorId, ErrorMeta } from '@shared/errors';
import { OrderPrice } from '@components/OrderPrice';
import { Paid } from '@components/Paid';

export class MoneySystem extends System {
  constructor() {
    super();
  }

  update(world: World, dt: number) {
    for (const [entity, components] of world.view(BuyAction)) {
      const { buyer, buyable } = components.get(BuyAction);
      const buyerComponents = world.getEntityComponents(buyer);
      if (!buyerComponents) {
        this.showError(world, 'noEntity', { entity });
        continue;
      }
      const money = buyerComponents.get(Money);
      if (!money) {
        this.showError(world, 'buyNoMoney', {});
        continue;
      }
      const cost = this.getCost(world, buyable);
      if (cost === null) {
        this.showError(world, 'buyNoCost', {});
        continue;
      }
      if (money.value - cost < 0) {
        this.showError(world, 'buyNotEnoughMoney', {
          amount: cost - money.value,
        });
        continue;
      }
      money.value -= cost;
      world.addEntityComponents(entity, new Paid());
    }
  }

  getCost(world: World, buyableEntity: number): number | null {
    const buyableComponents = world.getEntityComponents(buyableEntity);
    if (!buyableComponents) {
      this.showError(world, 'noEntity', { entity: buyableEntity });
      return null;
    }
    const unlockPrice = buyableComponents.get(UnlockPrice);
    if (unlockPrice) return unlockPrice.value;
    const orderPrice = buyableComponents.get(OrderPrice);
    if (orderPrice) return orderPrice.value;
    return null;
  }

  showError<T extends ErrorId>(
    world: World,
    errorId: T,
    errorMeta: ErrorMeta<T>
  ) {
    spawnActionError(world, errorId, errorMeta);
  }
}
