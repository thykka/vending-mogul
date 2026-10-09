import { World } from '@jakeklassen/ecs';
import { Money } from '@components/Money';
import { UnlockPrice } from '@components/UnlockPrice';
import { spawnBuyAction } from '@factories/Action-factory';
import { MoneySystem } from './MoneySystem';
import { ActionSystem } from './ActionSystem';
import { ActionError } from '@components/ActionError';
import { OrderPrice } from '@components/OrderPrice';

let world: World;

describe('MoneySystem', () => {
  beforeEach(() => {
    world = new World();
    world.addSystem(new MoneySystem());
    world.addSystem(new ActionSystem());
  });

  it('should buy an entity with UnlockPrice', () => {
    const buyer = world.createEntity();
    world.addEntityComponents(buyer, new Money(100));
    const target = world.createEntity();
    world.addEntityComponents(target, new UnlockPrice(10));
    spawnBuyAction(world, buyer, target);

    world.update(0);

    const buyerComponents = world.getEntityComponents(buyer)!;
    const money = buyerComponents.get(Money)!;
    expect(money.value).toBe(90);

    world.update(0);

    expect(money.value).toBe(90);
  });

  it('should buy an entity with OrderPrice', () => {
    const buyer = world.createEntity();
    world.addEntityComponents(buyer, new Money(50));
    const target = world.createEntity();
    world.addEntityComponents(target, new OrderPrice(50));
    spawnBuyAction(world, buyer, target);

    world.update(0);

    const buyerComponents = world.getEntityComponents(buyer)!;
    const money = buyerComponents.get(Money)!;
    expect(money.value).toBe(0);
  });

  it('should not buy if buyer cannot afford UnlockPrice', () => {
    const buyer = world.createEntity();
    world.addEntityComponents(buyer, new Money(20));
    const target = world.createEntity();
    world.addEntityComponents(target, new UnlockPrice(25));
    spawnBuyAction(world, buyer, target);

    world.update(0);

    const buyerComponents = world.getEntityComponents(buyer)!;
    const money = buyerComponents.get(Money)!;
    expect(money.value).toBe(20);

    const actionErrors = world.view(ActionError);
    const [[actionError, errorComponents]] = actionErrors;
    expect(errorComponents.get(ActionError).errorId).toBe('buyNotEnoughMoney');
  });
});
