import type { EntityId, World } from '@jakeklassen/ecs';
import { loadData, allIds, type LocationId } from '@data/registry';
import { LocationDataId } from '@components/DataId';
import { Name } from '@components/Name';
import { Locked } from '@components/Locked';
import { UnlockPrice } from '@components/UnlockPrice';
import { MachineCapacity } from '@components/MachineCapacity';

export function spawnLocation(world: World, id: LocationId): EntityId {
  const locationData = loadData('locations', id);
  const location = world.createEntity();
  world.addEntityComponents(
    location,
    new LocationDataId(id),
    new Name(id),
    new UnlockPrice(locationData.unlockCost),
    new MachineCapacity(locationData.machinesMax),
    new Locked()
  );
  return location;
}

export function spawnLocations(world: World) {
  const locations = allIds('locations');
  locations.forEach((locationId) => spawnLocation(world, locationId));
}
