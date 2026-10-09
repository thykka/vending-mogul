import { System, World } from '@jakeklassen/ecs';
import { StockAction } from '@components/StockAction';
import { Stored } from '@components/Stored';
import { Amount } from '@components/Amount';
import { Contents } from '@components/Contents';
import { ProductDataId } from '@components/DataId';
import { ProductCapacity } from '@components/ProductCapacity';
import { spawnActionError } from '@factories/Action-factory';
import { spawnProductStack } from '@factories/Product-factory';
import { fitsSlot } from '@shared/queries';

/** Moves stored products into machine Slots, up to each Slot's capacity. */
export class StockSystem extends System {
  constructor() {
    super();
  }

  update(world: World, dt: number) {
    for (const [_action, components] of world.view(StockAction)) {
      const { product, slot } = components.get(StockAction);
      const productComponents = world.getEntityComponents(product);
      const slotComponents = world.getEntityComponents(slot);
      const productId = productComponents?.get(ProductDataId)?.id;
      const stored = productComponents?.get(Amount);
      if (!productComponents || !productId || !stored) {
        spawnActionError(world, 'noEntity', { entity: product });
        continue;
      }
      const contents = slotComponents?.get(Contents);
      const capacity = slotComponents?.get(ProductCapacity);
      if (!slotComponents || !contents || !capacity) {
        spawnActionError(world, 'noEntity', { entity: slot });
        continue;
      }
      if (!productComponents.get(Stored)) {
        spawnActionError(world, 'stockNotStored', {});
        continue;
      }
      if (!fitsSlot(productComponents, slotComponents)) {
        spawnActionError(world, 'stockNoFit', {});
        continue;
      }
      const current =
        contents.item === null
          ? undefined
          : world.getEntityComponents(contents.item);
      if (current && current.get(ProductDataId)?.id !== productId) {
        spawnActionError(world, 'stockSlotOccupied', {});
        continue;
      }
      const stocked = current?.get(Amount);
      const space = capacity.value - (stocked?.value ?? 0);
      if (space <= 0) {
        spawnActionError(world, 'stockSlotFull', {});
        continue;
      }
      const moved = Math.min(space, stored.value);
      stored.value -= moved;
      if (stocked) stocked.value += moved;
      else contents.item = spawnProductStack(world, productId, moved);
      if (stored.value <= 0) world.deleteEntity(product);
    }
  }
}
