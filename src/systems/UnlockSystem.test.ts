import { World } from '@jakeklassen/ecs';
import { UnlockSystem } from './UnlockSystem';
import { Locked } from '../components/Locked';
import {
  spawnUnlockAction,
  spawnUnlockPurchase,
} from '../factories/Action-factory';
import { MoneySystem } from './MoneySystem';
import { ActionSystem } from './ActionSystem';
import { Money } from '../components/Money';
import { UnlockPrice } from '../components/UnlockPrice';
import { Action } from '../components/Action';
import { ActionError } from '../components/ActionError';

describe('UnlockAction', () => {
  it('should unlock an entity', () => {
    const world = new World();
    const unlockable = world.createEntity();
    world.addEntityComponents(unlockable, new Locked());
    world.addSystem(new UnlockSystem());

    spawnUnlockAction(world, unlockable);
    const components = world.getEntityComponents(unlockable)!;
    const initiallyLocked = components.get(Locked);
    expect(Boolean(initiallyLocked)).toBe(true);

    world.update(0);

    const locked = components.get(Locked);
    expect(Boolean(locked)).toBe(false);
  });
});

describe('Unlock purchase', () => {
  let world: World;
  beforeEach(() => {
    world = new World();
    world.addSystem(new MoneySystem());
    world.addSystem(new UnlockSystem());
    world.addSystem(new ActionSystem());
  });

  it('should charge the buyer and unlock when affordable', () => {
    const buyer = world.createEntity();
    world.addEntityComponents(buyer, new Money(100));
    const target = world.createEntity();
    world.addEntityComponents(target, new Locked(), new UnlockPrice(30));
    spawnUnlockPurchase(world, buyer, target);

    world.update(0);

    expect(world.getEntityComponents(buyer)!.get(Money)!.value).toBe(70);
    expect(world.getEntityComponents(target)!.get(Locked)).toBeUndefined();
    expect(world.view(Action).length).toBe(0);
  });

  it('should neither charge nor unlock when unaffordable', () => {
    const buyer = world.createEntity();
    world.addEntityComponents(buyer, new Money(20));
    const target = world.createEntity();
    world.addEntityComponents(target, new Locked(), new UnlockPrice(30));
    spawnUnlockPurchase(world, buyer, target);

    world.update(0);

    expect(world.getEntityComponents(buyer)!.get(Money)!.value).toBe(20);
    expect(world.getEntityComponents(target)!.get(Locked)).toBeDefined();
    const [[, errorComponents]] = world.view(ActionError);
    expect(errorComponents.get(ActionError)!.errorId).toBe('buyNotEnoughMoney');
    expect(errorComponents.get(ActionError)!.meta).toEqual({ amount: 10 });
  });
});
