import { System, World } from '@jakeklassen/ecs';
import { CollectAction } from '@components/CollectAction';
import { Money } from '@components/Money';
import { spawnActionError } from '@factories/Action-factory';

/** Moves Money collected from machines to the collector. */
export class CollectSystem extends System {
  constructor() {
    super();
  }

  update(world: World, dt: number) {
    for (const [_action, components] of world.view(CollectAction)) {
      const { machine, collector } = components.get(CollectAction);
      const machineMoney = world.getEntityComponents(machine)?.get(Money);
      if (!machineMoney) {
        spawnActionError(world, 'noEntity', { entity: machine });
        continue;
      }
      const collectorMoney = world.getEntityComponents(collector)?.get(Money);
      if (!collectorMoney) {
        spawnActionError(world, 'noEntity', { entity: collector });
        continue;
      }
      collectorMoney.value += machineMoney.value;
      machineMoney.value = 0;
    }
  }
}
