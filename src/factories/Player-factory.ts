import type { EntityId, World } from '@jakeklassen/ecs';
import { Name } from '@components/Name';
import { Money } from '@components/Money';
import { Player } from '@components/Player';

export function spawnPlayer(world: World, name = 'Anonymous'): EntityId {
  const player = world.createEntity();
  world.addEntityComponents(
    player,
    new Player(),
    new Name(name),
    new Money(125)
  );
  return player;
}
