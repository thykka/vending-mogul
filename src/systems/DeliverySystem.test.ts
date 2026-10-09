import { World } from '@jakeklassen/ecs';
import { Order } from '@components/Order';
import { Stored } from '@components/Stored';
import { Amount } from '@components/Amount';
import { MachineDataId, ProductDataId } from '@components/DataId';
import { loadData } from '@data/registry';
import { spawnOrder } from '@factories/Order-factory';
import { TimerSystem } from './TimerSystem';
import { DeliverySystem } from './DeliverySystem';

let world: World;

describe('DeliverySystem', () => {
  beforeEach(() => {
    world = new World();
    world.addSystem(new TimerSystem());
    world.addSystem(new DeliverySystem());
  });

  it('should keep orders until delivery time has passed', () => {
    const { deliveryTime } = loadData('machineOrders', 'gumball-single');
    spawnOrder(world, 'machineOrders', 'gumball-single');

    world.update(deliveryTime * 1000 - 1);

    expect(world.view(Order).length).toBe(1);
    expect(world.view(Stored).length).toBe(0);
  });

  it('should deliver a machine into Storage', () => {
    const { deliveryTime } = loadData('machineOrders', 'gumball-single');
    spawnOrder(world, 'machineOrders', 'gumball-single');

    world.update(deliveryTime * 1000);

    expect(world.view(Order).length).toBe(0);
    const machines = world.view(MachineDataId, Stored);
    expect(machines.length).toBe(1);
    const [[_machine, components]] = machines;
    expect(components.get(MachineDataId).id).toBe('gumball-single');
  });

  it('should deliver each ordered product stack into Storage', () => {
    const { deliveryTime, products } = loadData(
      'productOrders',
      'bouncyballbox'
    );
    const [{ product, stacks }] = products;
    const { stackSize } = loadData('products', 'bouncyball');
    spawnOrder(world, 'productOrders', 'bouncyballbox');

    world.update(deliveryTime * 1000);

    expect(world.view(Order).length).toBe(0);
    const stored = world.view(ProductDataId, Amount, Stored);
    expect(stored.length).toBe(stacks);
    for (const [_entity, components] of stored) {
      expect(components.get(ProductDataId).id).toBe(product);
      expect(components.get(Amount).value).toBe(stackSize);
    }
  });
});
