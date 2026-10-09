import type { EntityId } from '@jakeklassen/ecs';
import { Flex } from '@ui/components/Flex/Flex';
import { useGameView } from '@ui/hooks/useGameView';
import { useGame } from '@ui/context/GameContext';
import { useNavigation } from '@ui/context/NavigationContext';
import { LocationDataId, MachineDataId } from '@components/DataId';
import { MachineCapacity } from '@components/MachineCapacity';
import { Locked } from '@components/Locked';
import { Stored } from '@components/Stored';
import type { MachineId } from '@data/registry';
import { spawnInstallAction } from '@factories/Action-factory';
import { installedMachines } from '@shared/queries';

/** One stored machine entity per machine type. */
function useStoredMachineTypes() {
  const stored = useGameView(MachineDataId, Stored);
  const byType = new Map<MachineId, EntityId>();
  for (const [machine, components] of stored) {
    const { id } = components.get(MachineDataId);
    if (!byType.has(id)) byType.set(id, machine);
  }
  return byType;
}

export function MapView() {
  const game = useGame();
  const { viewMachine } = useNavigation();
  const locations = useGameView(LocationDataId, MachineCapacity).filter(
    ([_location, components]) => !components.get(Locked)
  );
  const storedTypes = useStoredMachineTypes();

  return (
    <Flex>
      <h2>Map</h2>
      {locations.length ? (
        locations.map(([location, components]) => {
          const { id } = components.get(LocationDataId);
          const capacity = components.get(MachineCapacity).value;
          const machines = installedMachines(game, location);
          return (
            <Flex pad gap key={location}>
              <Flex horizontal gap>
                <Flex fit verticalCenter type="h3">
                  {id}
                </Flex>
                <Flex center>
                  {machines.length}/{capacity} machines
                </Flex>
              </Flex>
              {machines.map(([machine, machineComponents]) => (
                <Flex horizontal gap key={machine}>
                  <Flex pad fit verticalCenter>
                    {machineComponents.get(MachineDataId).id}
                  </Flex>
                  <Flex
                    pad
                    theme="invert"
                    type="button"
                    onClick={() => viewMachine(machine)}
                  >
                    View
                  </Flex>
                </Flex>
              ))}
              {machines.length < capacity && (
                <Flex horizontal wrap gap>
                  {storedTypes.size ? (
                    [...storedTypes].map(([machineId, machine]) => (
                      <Flex
                        pad
                        theme="invert"
                        type="button"
                        key={machineId}
                        onClick={() =>
                          spawnInstallAction(game, machine, location)
                        }
                      >
                        Install {machineId}
                      </Flex>
                    ))
                  ) : (
                    <Flex pad>No machines in storage</Flex>
                  )}
                </Flex>
              )}
            </Flex>
          );
        })
      ) : (
        <span>No unlocked locations. Unlock one in the Shop.</span>
      )}
    </Flex>
  );
}
