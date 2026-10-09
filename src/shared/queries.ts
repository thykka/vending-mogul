import type { EntityId, World } from '@jakeklassen/ecs';
import { Amount } from '@components/Amount';
import { Contents } from '@components/Contents';
import { MachineDataId, ProductDataId } from '@components/DataId';
import { Parent } from '@components/Parent';
import { ProductCapacity } from '@components/ProductCapacity';
import { Shape } from '@components/Shape';
import { Size } from '@components/Size';
import { Stored } from '@components/Stored';
import type { ErrorId } from '@shared/errors';

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

/** Components of the product stack held by `slot`, if any. */
export function slotStack(world: World, slot: Components) {
  const item = slot.get(Contents)?.item;
  return item === null || item === undefined
    ? undefined
    : world.getEntityComponents(item);
}

type StockErrorId = Extract<ErrorId, `stock${string}`>;

/** Why a stored `product` can't be stocked into `slot`, or null if it can. */
export function stockError(
  world: World,
  product: Components,
  slot: Components
): StockErrorId | null {
  if (!product.get(Stored)) return 'stockNotStored';
  if (!fitsSlot(product, slot)) return 'stockNoFit';
  const stack = slotStack(world, slot);
  if (stack && stack.get(ProductDataId)?.id !== product.get(ProductDataId)?.id)
    return 'stockSlotOccupied';
  const capacity = slot.get(ProductCapacity)?.value ?? 0;
  if ((stack?.get(Amount)?.value ?? 0) >= capacity) return 'stockSlotFull';
  return null;
}

export function canStock(world: World, product: Components, slot: Components) {
  return stockError(world, product, slot) === null;
}
