import { World } from '@jakeklassen/ecs';
import { Money } from '../components/Money';
import { UnlockPrice } from '../components/UnlockPrice';
import { spawnBuyAction } from '../factories/Action-factory';
import { MoneySystem } from './MoneySystem';
import { ActionSystem } from './ActionSystem';

describe('MoneySystem', () => {
  it('should unlock', () => {
    const world = new World();
    const buyer = world.createEntity();
    world.addEntityComponents(buyer, new Money(100));
    const target = world.createEntity();
    world.addEntityComponents(target, new UnlockPrice(10));
    spawnBuyAction(world, buyer, target);

    world.addSystem(new MoneySystem());
    world.addSystem(new ActionSystem());

    world.update(0);

    const buyerComponents = world.getEntityComponents(buyer);
    const money = buyerComponents.get(Money);
    expect(money.value).toBe(90);

    world.update(0);
    expect(money.value).toBe(90);
  });
});
