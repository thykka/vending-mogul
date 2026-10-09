import { System, World } from '@jakeklassen/ecs';
import { InstallAction } from '@components/InstallAction';
import { Stored } from '@components/Stored';
import { Locked } from '@components/Locked';
import { Parent } from '@components/Parent';
import { MachineDataId } from '@components/DataId';
import { MachineCapacity } from '@components/MachineCapacity';
import { spawnActionError } from '@factories/Action-factory';
import { installedMachines } from '@shared/queries';

/** Moves stored machines into Locations. */
export class InstallSystem extends System {
  constructor() {
    super();
  }

  update(world: World, dt: number) {
    for (const [_action, components] of world.view(InstallAction)) {
      const { machine, location } = components.get(InstallAction);
      const machineComponents = world.getEntityComponents(machine);
      const locationComponents = world.getEntityComponents(location);
      if (!machineComponents?.get(MachineDataId)) {
        spawnActionError(world, 'noEntity', { entity: machine });
        continue;
      }
      const capacity = locationComponents?.get(MachineCapacity);
      if (!locationComponents || !capacity) {
        spawnActionError(world, 'noEntity', { entity: location });
        continue;
      }
      if (!machineComponents.get(Stored)) {
        spawnActionError(world, 'installNotStored', {});
        continue;
      }
      if (locationComponents.get(Locked)) {
        spawnActionError(world, 'installLocationLocked', {});
        continue;
      }
      if (installedMachines(world, location).length >= capacity.value) {
        spawnActionError(world, 'installLocationFull', {});
        continue;
      }
      world.removeEntityComponents(machine, Stored);
      world.addEntityComponents(machine, new Parent(location));
    }
  }
}
