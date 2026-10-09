import type { World } from '@jakeklassen/ecs';
import { Name } from '../components/Name.js';
import { Money } from '../components/Money.js';
import { Player } from '../components/Player.js';

export function spawnPlayer(world: World, name = 'Anonymous'): number {
  const player = world.createEntity();
  world.addEntityComponents(
    player,
    new Player(),
    new Name(name),
    new Money(150)
  );
  return player;
}
