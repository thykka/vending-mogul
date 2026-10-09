import type { World } from '@jakeklassen/ecs';
import { loadData, allIds, type LocationId } from '@data/registry';
import { LocationDataId } from '@components/DataId';
import { Name } from '@components/Name';
import { Locked } from '@components/Locked';
import { UnlockPrice } from '@components/UnlockPrice';

export function spawnLocation(world: World, id: LocationId) {
  const locationData = {
    locked: true,
    ...loadData('locations', id),
  };
  const location = world.createEntity();
  world.addEntityComponents(
    location,
    new LocationDataId(id),
    new Name(id),
    new UnlockPrice(locationData.unlockCost)
  );
  if (locationData.locked) world.addEntityComponents(location, new Locked());
}

export function spawnLocations(world: World) {
  const locations = allIds('locations');
  locations.forEach((locationId) => spawnLocation(world, locationId));
}
