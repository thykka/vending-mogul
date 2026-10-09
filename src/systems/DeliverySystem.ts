import { System, World } from '@jakeklassen/ecs';
import { Order } from '@components/Order';
import { Timer } from '@components/timer';
import { Stored } from '@components/Stored';
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
      for (const item of this.deliver(world, components.get(Order))) {
        world.addEntityComponents(item, new Stored());
      }
      world.deleteEntity(entity);
    }
  }

  deliver(world: World, order: Order): number[] {
    if (order.source === 'machineOrders') {
      const { machine } = loadData('machineOrders', order.id as MachineOrderId);
      return [spawnMachine(world, machine as MachineId)];
    }
    const { products } = loadData('productOrders', order.id as ProductOrderId);
    return products.flatMap(({ product, stacks }) =>
      Array.from({ length: stacks }, () =>
        spawnProductStack(world, product as ProductId)
      )
    );
  }
}
