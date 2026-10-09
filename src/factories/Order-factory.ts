import type { EntityId, World } from '@jakeklassen/ecs';
import { loadOrderData, type RegistryKey, type OrderSource } from '@data/registry';
import { BuyAction } from '@components/BuyAction';
import { OrderAction } from '@components/OrderAction';
import { Order } from '@components/Order';
import { Timer } from '@components/Timer';
import { spawnAction } from './Action-factory';

/** Places an Order only if `buyer` can pay its price. */
export function spawnOrderPurchase<S extends OrderSource>(
  world: World,
  buyer: EntityId,
  source: S,
  id: RegistryKey<S>
): EntityId {
  const { price } = loadOrderData(source, id);
  return spawnAction(
    world,
    new BuyAction(buyer, price),
    new OrderAction(source, id)
  );
}

export function spawnOrder<S extends OrderSource>(
  world: World,
  source: S,
  id: RegistryKey<S>
): EntityId {
  const { deliveryTime } = loadOrderData(source, id);
  const order = world.createEntity();
  world.addEntityComponents(
    order,
    new Order(source, id),
    new Timer(deliveryTime * 1000)
  );
  return order;
}
