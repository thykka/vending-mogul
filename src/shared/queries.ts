import type { EntityId, World } from '@jakeklassen/ecs';
import { MachineDataId } from '@components/DataId';
import { Parent } from '@components/Parent';

/** Machines installed at `location`. */
export function installedMachines(world: World, location: EntityId) {
  return world
    .view(MachineDataId, Parent)
    .filter(
      ([_machine, components]) => components.get(Parent).entity === location
    );
}
