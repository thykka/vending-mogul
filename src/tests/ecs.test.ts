import { System, World } from '@jakeklassen/ecs';
import { Name } from '@components/Name';

describe('Basic ECS test', () => {
  it('Simple integration test', () => {
    const world = new World();
    const entity = world.createEntity();
    world.addEntityComponents(entity, new Name('test'));

    world.addSystem(
      new (class Test extends System {
        update(world: World, dt: number) {
          const [[entity, components]] = world.view(Name);
          const name = components.get(Name);
          expect(name.text).toBe('test');
        }
      })()
    );
    world.update(0);
  });
});
