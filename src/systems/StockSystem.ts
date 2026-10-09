import { System, World } from '@jakeklassen/ecs';
import { StockAction } from '@components/StockAction';
import { Amount } from '@components/Amount';
import { Contents } from '@components/Contents';
import { ProductDataId } from '@components/DataId';
import { ProductCapacity } from '@components/ProductCapacity';
import { spawnActionError } from '@factories/Action-factory';
import { spawnProductStack } from '@factories/Product-factory';
import { slotStack, stockError } from '@shared/queries';

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
      const error = stockError(world, productComponents, slotComponents);
      if (error) {
        spawnActionError(world, error, {});
        continue;
      }
      const stocked = slotStack(world, slotComponents)?.get(Amount);
      const moved = Math.min(
        capacity.value - (stocked?.value ?? 0),
        stored.value
      );
      stored.value -= moved;
      if (stocked) stocked.value += moved;
      else contents.item = spawnProductStack(world, productId, moved);
      if (stored.value <= 0) world.deleteEntity(product);
    }
  }
}
