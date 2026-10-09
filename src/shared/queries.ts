import type { EntityId, World } from '@jakeklassen/ecs';
import { MachineDataId } from '@components/DataId';
import { Parent } from '@components/Parent';
import { Shape } from '@components/Shape';
import { Size } from '@components/Size';

/** Machines installed at `location`. */
export function installedMachines(world: World, location: EntityId) {
  return world
    .view(MachineDataId, Parent)
    .filter(
      ([_machine, components]) => components.get(Parent).entity === location
    );
}

/** Components of a single entity, as returned by `world.getEntityComponents`. */
type Components = NonNullable<ReturnType<World['getEntityComponents']>>;

/** Products fit a Slot only if their shape and dimensions match exactly. */
export function fitsSlot(product: Components, slot: Components) {
  const productShape = product.get(Shape);
  const productSize = product.get(Size);
  const slotShape = slot.get(Shape);
  const slotSize = slot.get(Size);
  if (!productShape || !productSize || !slotShape || !slotSize) return false;
  return (
    productShape.id === slotShape.id &&
    productSize.w === slotSize.w &&
    productSize.h === slotSize.h
  );
}
