import { World } from '@jakeklassen/ecs';
import { Stored } from '@components/Stored';
import { Locked } from '@components/Locked';
import { Parent } from '@components/Parent';
import { ActionError } from '@components/ActionError';
import { spawnInstallAction } from '@factories/Action-factory';
import { spawnLocation } from '@factories/Location-factory';
import { spawnMachine } from '@factories/Machine-factory';
import { loadData } from '@data/registry';
import { InstallSystem } from './InstallSystem';
import { ActionSystem } from './ActionSystem';

let world: World;

function spawnStoredMachine() {
  const machine = spawnMachine(world, 'gumball-single');
  world.addEntityComponents(machine, new Stored());
  return machine;
}

function spawnUnlockedLocation() {
  const location = spawnLocation(world, 'convenienceStore');
  world.removeEntityComponents(location, Locked);
  return location;
}

describe('InstallSystem', () => {
  beforeEach(() => {
    world = new World();
    world.addSystem(new InstallSystem());
    world.addSystem(new ActionSystem());
  });

  it('should move a stored machine into a location', () => {
    const machine = spawnStoredMachine();
    const location = spawnUnlockedLocation();
    spawnInstallAction(world, machine, location);

    world.update(0);

    const components = world.getEntityComponents(machine)!;
    expect(components.get(Stored)).toBeUndefined();
    expect(components.get(Parent)?.entity).toBe(location);
    expect(world.view(ActionError).length).toBe(0);
  });

  it('should not install into a locked location', () => {
    const machine = spawnStoredMachine();
    const location = spawnLocation(world, 'convenienceStore');
    spawnInstallAction(world, machine, location);

    world.update(0);

    const components = world.getEntityComponents(machine)!;
    expect(components.get(Stored)).toBeDefined();
    expect(components.get(Parent)).toBeUndefined();
    expect(world.view(ActionError).length).toBe(1);
  });

  it('should not install more machines than the location fits', () => {
    const { machinesMax } = loadData('locations', 'convenienceStore');
    const location = spawnUnlockedLocation();
    const machines = Array.from({ length: machinesMax + 1 }, () =>
      spawnStoredMachine()
    );
    for (const machine of machines) {
      spawnInstallAction(world, machine, location);
    }

    world.update(0);

    expect(world.view(Stored).length).toBe(1);
    expect(world.view(ActionError).length).toBe(1);
  });

  it('should not install a machine that is not in Storage', () => {
    const machine = spawnStoredMachine();
    const location = spawnUnlockedLocation();
    spawnInstallAction(world, machine, location);
    world.update(0);
    const otherLocation = spawnUnlockedLocation();
    spawnInstallAction(world, machine, otherLocation);

    world.update(0);

    const components = world.getEntityComponents(machine)!;
    expect(components.get(Parent)?.entity).toBe(location);
    expect(world.view(ActionError).length).toBe(1);
  });
});
