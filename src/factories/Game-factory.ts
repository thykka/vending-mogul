import { World } from '@jakeklassen/ecs';
import { spawnPlayer } from './Player-factory';
import { spawnLocations } from './Location-factory';
import { spawnMachines } from './Machine-factory';
import { MoneySystem } from '../systems/MoneySystem';
import { UnlockSystem } from '../systems/UnlockSystem';
import { ActionSystem } from '../systems/ActionSystem';
import { TimerSystem } from '../systems/TimerSystem';
import { ActionErrorSystem } from '../systems/ActionErrorSystem';

export function spawnGame(): World {
  const world = new World();
  globalThis.world = world;
  globalThis.player = spawnPlayer(world);
  spawnLocations(world);
  spawnMachines(world);
  // Order matters: pay, then unlock, then clean up action entities
  world.addSystem(new MoneySystem());
  world.addSystem(new UnlockSystem());
  world.addSystem(new ActionSystem());
  world.addSystem(new TimerSystem());
  world.addSystem(new ActionErrorSystem());
  return world;
}
