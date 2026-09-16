import { World } from '@jakeklassen/ecs';
import { Action } from '../components/Action';
import { UnlockAction } from '../components/UnlockAction';
import { BuyAction } from '../components/BuyAction';

export function spawnAction(world: World): number {
  const action = world.createEntity();
  world.addEntityComponents(action, new Action());
  return action;
}

export function spawnUnlockAction(world: World, unlockable: number): number {
  const action = world.createEntity();
  world.addEntityComponents(action, new Action(), new UnlockAction(unlockable));
  return action;
}

export function spawnBuyAction(
  world: World,
  buyer: number,
  buyable: number
): number {
  const action = world.createEntity();
  world.addEntityComponents(
    action,
    new Action(),
    new BuyAction(buyer, buyable)
  );
  return action;
}
