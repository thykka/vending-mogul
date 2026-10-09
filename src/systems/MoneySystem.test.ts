import { World } from '@jakeklassen/ecs';
import { Money } from '@components/Money';
import { Paid } from '@components/Paid';
import { spawnBuyAction } from '@factories/Action-factory';
import { MoneySystem } from './MoneySystem';
import { ActionError } from '@components/ActionError';

let world: World;

describe('MoneySystem', () => {
  beforeEach(() => {
    world = new World();
    world.addSystem(new MoneySystem());
  });

  it('should charge the buyer and mark the action as Paid', () => {
    const buyer = world.createEntity();
    world.addEntityComponents(buyer, new Money(100));
    const action = spawnBuyAction(world, buyer, 10);

    world.update(0);

    expect(world.getEntityComponents(buyer)!.get(Money)!.value).toBe(90);
    expect(world.getEntityComponents(action)!.get(Paid)).toBeDefined();
  });

  it('should let the buyer spend all of their money', () => {
    const buyer = world.createEntity();
    world.addEntityComponents(buyer, new Money(50));
    spawnBuyAction(world, buyer, 50);

    world.update(0);

    expect(world.getEntityComponents(buyer)!.get(Money)!.value).toBe(0);
  });

  it('should not buy if buyer cannot afford the cost', () => {
    const buyer = world.createEntity();
    world.addEntityComponents(buyer, new Money(20));
    const action = spawnBuyAction(world, buyer, 25);

    world.update(0);

    expect(world.getEntityComponents(buyer)!.get(Money)!.value).toBe(20);
    expect(world.getEntityComponents(action)!.get(Paid)).toBeUndefined();
    const [[_error, errorComponents]] = world.view(ActionError);
    expect(errorComponents.get(ActionError)).toMatchObject({
      errorId: 'buyNotEnoughMoney',
      meta: { amount: 5 },
    });
  });

  it('should report a missing buyer', () => {
    spawnBuyAction(world, 999, 10);

    world.update(0);

    const [[_error, errorComponents]] = world.view(ActionError);
    expect(errorComponents.get(ActionError)).toMatchObject({
      errorId: 'noEntity',
      meta: { entity: 999 },
    });
  });
});
