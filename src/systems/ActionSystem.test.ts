import { World } from '@jakeklassen/ecs';
import { Action } from '../components/Action';
import { ActionSystem } from './ActionSystem';

describe('Actions', () => {
  it('should remove an action entity when action is completed', () => {
    const world = new World();
    const action = world.createEntity();
    world.addEntityComponents(action, new Action());
    world.addSystem(new ActionSystem());
    world.update(0);
    const actions = world.view(Action);
    expect(actions.length).toBe(0);
  });
});
