import { EntityId, World } from '@jakeklassen/ecs';
import { spawnPlayer } from './Player-factory';
import { spawnLocations } from './Location-factory';
import { MoneySystem } from '@systems/MoneySystem';
import { UnlockSystem } from '@systems/UnlockSystem';
import { ActionSystem } from '@systems/ActionSystem';
import { OrderSystem } from '@systems/OrderSystem';
import { InstallSystem } from '@systems/InstallSystem';
import { StockSystem } from '@systems/StockSystem';
import { CollectSystem } from '@systems/CollectSystem';
import { TimerSystem } from '@systems/TimerSystem';
import { ActionErrorSystem } from '@systems/ActionErrorSystem';
import { DeliverySystem } from '@systems/DeliverySystem';
import { SalesSystem } from '@systems/SalesSystem';

export function spawnGame(): World {
  const world = new World();
  // Debugging helpers for inspecting the game from the browser console
  (globalThis as typeof globalThis & { world: World }).world = world;
  (globalThis as typeof globalThis & { player: EntityId }).player =
    spawnPlayer(world);
  spawnLocations(world);
  // Systems run in this order on every update, reacting to each other's output:
  // - MoneySystem marks affordable BuyActions as Paid, and Unlock/OrderSystem
  //   only act on Paid actions, so it must run before them
  // - ActionSystem deletes every action entity, so it must run after all
  //   systems that handle actions, or those actions are lost unhandled
  // - TimerSystem runs before the systems that react to completed Timers,
  //   so they see completions in the same update instead of the next one
  world.addSystem(new MoneySystem());
  world.addSystem(new UnlockSystem());
  world.addSystem(new OrderSystem());
  world.addSystem(new InstallSystem());
  world.addSystem(new StockSystem());
  world.addSystem(new CollectSystem());
  world.addSystem(new ActionSystem());

  world.addSystem(new TimerSystem());
  world.addSystem(new ActionErrorSystem());
  world.addSystem(new DeliverySystem());
  world.addSystem(new SalesSystem());
  return world;
}
