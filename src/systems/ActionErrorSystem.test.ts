import { World } from '@jakeklassen/ecs';
import { ActionError } from '@components/ActionError';
import {
  ACTION_ERROR_DURATION,
  spawnActionError,
} from '@factories/Action-factory';
import { TimerSystem } from './TimerSystem';
import { ActionErrorSystem } from './ActionErrorSystem';

let world: World;

describe('ActionErrorSystem', () => {
  beforeEach(() => {
    world = new World();
    world.addSystem(new TimerSystem());
    world.addSystem(new ActionErrorSystem());
  });

  it('should keep errors until their timer completes', () => {
    spawnActionError(world, 'buyNoMoney', {});

    world.update(ACTION_ERROR_DURATION - 1);

    expect(world.view(ActionError).length).toBe(1);
  });

  it('should remove errors once their timer completes', () => {
    spawnActionError(world, 'buyNoMoney', {});

    world.update(ACTION_ERROR_DURATION);

    expect(world.view(ActionError).length).toBe(0);
  });
});
