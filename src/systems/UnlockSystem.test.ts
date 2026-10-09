import { World } from '@jakeklassen/ecs';
import { UnlockSystem } from './UnlockSystem';
import { Locked } from '../components/Locked';
import { spawnUnlockAction } from '../factories/Action-factory';

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
