import { System, type World } from '@jakeklassen/ecs';
import { Timer } from '@components/Timer';

export class TimerSystem extends System {
  constructor() {
    super();
  }

  public update(world: World, dt: number): void {
    for (const [_entity, components] of world.view(Timer)) {
      const timer = components.get(Timer);
      if (timer.completed) continue;
      timer.elapsed = Math.min(timer.elapsed + dt, timer.duration);
    }
  }
}
