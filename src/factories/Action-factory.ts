import type { Component, EntityId, World } from '@jakeklassen/ecs';
import { Action } from '@components/Action';
import { UnlockAction } from '@components/UnlockAction';
import { BuyAction } from '@components/BuyAction';
import { ActionError } from '@components/ActionError';
import { Timer } from '@components/Timer';
import { InstallAction } from '@components/InstallAction';
import { StockAction } from '@components/StockAction';
import { CollectAction } from '@components/CollectAction';
import { UnlockPrice } from '@components/UnlockPrice';
import type { ErrorId, ErrorMeta } from '@shared/errors';

/** How long (ms) an ActionError stays visible before it is removed. */
export const ACTION_ERROR_DURATION = 3000;

/** Spawns an action entity, which ActionSystem removes at the end of the update. */
export function spawnAction(world: World, ...components: Component[]): EntityId {
  const action = world.createEntity();
  world.addEntityComponents(action, new Action(), ...components);
  return action;
}

export function spawnActionError<T extends ErrorId>(
  world: World,
  errorId: T,
  errorMeta: ErrorMeta<T>
): EntityId {
  const actionError = world.createEntity();
  world.addEntityComponents(
    actionError,
    new ActionError(errorId, errorMeta),
    new Timer(ACTION_ERROR_DURATION)
  );
  return actionError;
}

export function spawnUnlockAction(world: World, unlockable: EntityId): EntityId {
  return spawnAction(world, new UnlockAction(unlockable));
}

/** Unlocks `unlockable` only if `buyer` can pay its UnlockPrice. */
export function spawnUnlockPurchase(
  world: World,
  buyer: EntityId,
  unlockable: EntityId
): EntityId {
  const price = world.getEntityComponents(unlockable)?.get(UnlockPrice);
  if (!price) throw new Error(`Entity ${unlockable} has no UnlockPrice`);
  return spawnAction(
    world,
    new BuyAction(buyer, price.value),
    new UnlockAction(unlockable)
  );
}

export function spawnBuyAction(
  world: World,
  buyer: EntityId,
  cost: number
): EntityId {
  return spawnAction(world, new BuyAction(buyer, cost));
}

export function spawnInstallAction(
  world: World,
  machine: EntityId,
  location: EntityId
): EntityId {
  return spawnAction(world, new InstallAction(machine, location));
}

export function spawnStockAction(
  world: World,
  product: EntityId,
  slot: EntityId
): EntityId {
  return spawnAction(world, new StockAction(product, slot));
}

export function spawnCollectAction(
  world: World,
  machine: EntityId,
  collector: EntityId
): EntityId {
  return spawnAction(world, new CollectAction(machine, collector));
}
