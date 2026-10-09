import type { World } from '@jakeklassen/ecs';
import { loadOrderData, type DataId, type OrderSource } from '@data/registry';
import { Action } from '@components/Action';
import { BuyAction } from '@components/BuyAction';
import { OrderPrice } from '@components/OrderPrice';
import { OrderAction } from '@components/OrderAction';
import { Order } from '@components/Order';
import { Timer } from '@components/timer';

/**
 * Places an Order only if `buyer` can pay its price.
 * The action itself carries the OrderPrice, so it is also the BuyAction's buyable.
 */
export function spawnOrderPurchase<S extends OrderSource>(
  world: World,
  buyer: number,
  source: S,
  id: DataId<S>
): number {
  const { price } = loadOrderData(source, id);
  const action = world.createEntity();
  world.addEntityComponents(
    action,
    new Action(),
    new BuyAction(buyer, action),
    new OrderPrice(price),
    new OrderAction(source, id)
  );
  return action;
}

export function spawnOrder<S extends OrderSource>(
  world: World,
  source: S,
  id: DataId<S>
): number {
  const { deliveryTime } = loadOrderData(source, id);
  const order = world.createEntity();
  world.addEntityComponents(
    order,
    new Order(source, id),
    new Timer(deliveryTime * 1000)
  );
  return order;
}
