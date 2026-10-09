import type { EntityId, World } from '@jakeklassen/ecs';
import { loadData, type MachineId, type SlotId } from '@data/registry';
import { MachineDataId, SlotDataId } from '@components/DataId';
import { Size } from '@components/Size';
import { Shape } from '@components/Shape';
import { Parent } from '@components/Parent';
import { Contents } from '@components/Contents';
import { Money } from '@components/Money';
import { Children } from '@components/Children';
import { ProductCapacity } from '@components/ProductCapacity';

export function spawnMachine(
  world: World,
  id: MachineId,
  parent?: EntityId
): number {
  const machineData = loadData('machines', id);
  const machine = world.createEntity();
  const children = new Children();
  world.addEntityComponents(
    machine,
    new MachineDataId(id),
    new Money(0),
    children
  );
  if (parent !== undefined)
    world.addEntityComponents(machine, new Parent(parent));
  machineData.slots.forEach((row) => {
    row.forEach((slotId) => {
      const slotData = loadData('slots', slotId as SlotId);
      const slot = world.createEntity();
      world.addEntityComponents(
        slot,
        new SlotDataId(slotId as SlotId),
        new Parent(machine),
        new Size(slotData.width, slotData.height),
        new Shape(slotData.shape),
        new Contents(null),
        new ProductCapacity(slotData.capacity)
      );
      children.entities.add(slot);
    });
  });
  return machine;
}
