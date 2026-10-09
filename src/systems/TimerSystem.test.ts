import { World } from '@jakeklassen/ecs';
import { Timer } from '../components/timer';
import { TimerSystem } from './TimerSystem';

let world: World;

describe('TimerSystem', () => {
  beforeEach(() => {
    world = new World();
    world.addSystem(new TimerSystem());
  });

  it('should advance timers by dt', () => {
    const entity = world.createEntity();
    const timer = new Timer(1000);
    world.addEntityComponents(entity, timer);

    world.update(250);

    expect(timer.elapsed).toBe(250);
    expect(timer.progress).toBe(0.25);
    expect(timer.completed).toBe(false);
  });

  it('should complete and stop at duration', () => {
    const entity = world.createEntity();
    const timer = new Timer(1000);
    world.addEntityComponents(entity, timer);

    world.update(800);
    world.update(800);

    expect(timer.elapsed).toBe(1000);
    expect(timer.progress).toBe(1);
    expect(timer.completed).toBe(true);
  });

  it('should advance every timer', () => {
    const timers = [new Timer(100), new Timer(100)];
    timers[0].elapsed = 100;
    for (const timer of timers) {
      world.addEntityComponents(world.createEntity(), timer);
    }

    world.update(50);

    expect(timers[1].elapsed).toBe(50);
  });
});
