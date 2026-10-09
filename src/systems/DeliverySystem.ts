import { System, World } from '@jakeklassen/ecs';
import { Order } from '@components/Order';
import { Timer } from '@components/Timer';
import { Stored } from '@components/Stored';
import { Amount } from '@components/Amount';
import { ProductDataId } from '@components/DataId';
import {
  loadData,
  type MachineId,
  type MachineOrderId,
  type ProductId,
  type ProductOrderId,
} from '@data/registry';
import { spawnMachine } from '@factories/Machine-factory';
import { spawnProductStack } from '@factories/Product-factory';

/** Moves the contents of completed Orders into Storage. */
export class DeliverySystem extends System {
  constructor() {
    super();
  }

  update(world: World, dt: number) {
    for (const [entity, components] of world.view(Order, Timer)) {
      if (!components.get(Timer).completed) continue;
      this.deliver(world, components.get(Order));
      world.deleteEntity(entity);
    }
  }

  deliver(world: World, order: Order) {
    if (order.source === 'machineOrders') {
      const { machine } = loadData('machineOrders', order.id as MachineOrderId);
      const entity = spawnMachine(world, machine as MachineId);
      world.addEntityComponents(entity, new Stored());
      return;
    }
    const { products } = loadData('productOrders', order.id as ProductOrderId);
    for (const { product, amount } of products) {
      this.storeProducts(world, product as ProductId, amount);
    }
  }

  /** Adds to the stored stack of `product`, or creates one if there is none. */
  storeProducts(world: World, product: ProductId, amount: number) {
    for (const [_entity, components] of world.view(
      ProductDataId,
      Amount,
      Stored
    )) {
      if (components.get(ProductDataId).id !== product) continue;
      components.get(Amount).value += amount;
      return;
    }
    const entity = spawnProductStack(world, product, amount);
    world.addEntityComponents(entity, new Stored());
  }
}
