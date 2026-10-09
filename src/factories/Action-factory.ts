import { World } from '@jakeklassen/ecs';
import { Action } from '@components/Action';
import { UnlockAction } from '@components/UnlockAction';
import { BuyAction } from '@components/BuyAction';
import { ActionError } from '@components/ActionError';
import { Timer } from '@components/timer';
import { InstallAction } from '@components/InstallAction';
import { StockAction } from '@components/StockAction';
import { CollectAction } from '@components/CollectAction';
import type { ErrorId, ErrorMeta } from '@shared/errors';

/** How long (ms) an ActionError stays visible before it is removed. */
export const ACTION_ERROR_DURATION = 3000;

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
  world.addEntityComponents(
    actionError,
    new ActionError(errorId, errorMeta),
    new Timer(ACTION_ERROR_DURATION)
  );
  return actionError;
}

export function spawnUnlockAction(world: World, unlockable: number): number {
  const action = world.createEntity();
  world.addEntityComponents(action, new Action(), new UnlockAction(unlockable));
  return action;
}

/** Unlocks `unlockable` only if `buyer` can pay its UnlockPrice. */
export function spawnUnlockPurchase(
  world: World,
  buyer: number,
  unlockable: number
): number {
  const action = world.createEntity();
  world.addEntityComponents(
    action,
    new Action(),
    new BuyAction(buyer, unlockable),
    new UnlockAction(unlockable)
  );
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

export function spawnInstallAction(
  world: World,
  machine: number,
  location: number
): number {
  const action = world.createEntity();
  world.addEntityComponents(
    action,
    new Action(),
    new InstallAction(machine, location)
  );
  return action;
}

export function spawnStockAction(
  world: World,
  product: number,
  slot: number
): number {
  const action = world.createEntity();
  world.addEntityComponents(
    action,
    new Action(),
    new StockAction(product, slot)
  );
  return action;
}

export function spawnCollectAction(
  world: World,
  machine: number,
  collector: number
): number {
  const action = world.createEntity();
  world.addEntityComponents(
    action,
    new Action(),
    new CollectAction(machine, collector)
  );
  return action;
}
