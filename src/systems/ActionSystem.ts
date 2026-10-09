import { System, World } from '@jakeklassen/ecs';
import { Action } from '@components/Action';

export class ActionSystem extends System {
  constructor() {
    super();
  }

  update(world: World, dt: number) {
    this.cleanupActions(world);
  }

  cleanupActions(world) {
    for (const [entity, components] of world.view(Action)) {
      world.deleteEntity(entity);
    }
  }
}
