import { System, World } from '@jakeklassen/ecs';
import { OrderAction } from '@components/OrderAction';
import { Paid } from '@components/Paid';
import { spawnOrder } from '@factories/Order-factory';

export class OrderSystem extends System {
  constructor() {
    super();
  }

  update(world: World, dt: number) {
    for (const [_action, components] of world.view(OrderAction, Paid)) {
      const { source, id } = components.get(OrderAction);
      spawnOrder(world, source, id);
    }
  }
}
