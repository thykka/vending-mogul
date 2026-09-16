import { World } from '@jakeklassen/ecs';
import { Action } from '../components/Action';
import { UnlockAction } from '../components/UnlockAction';
import { BuyAction } from '../components/BuyAction';
import { ActionError } from '../components/ActionError';
import type { ErrorId, ErrorMeta } from '../shared/errors';

export function spawnAction(world: World): number {
  const action = world.createEntity();
  world.addEntityComponents(action, new Action());
  return action;
}

export function spawnActionError<T extends ErrorId>(
  world: World,
  errorId: T,
  errorMeta: ErrorMeta<T>
): number {
  const actionError = world.createEntity();
  world.addEntityComponents(actionError, new ActionError(errorId, errorMeta));
  return actionError;
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
