import { World } from '@jakeklassen/ecs';
import { Money } from '../components/Money';
import { Order } from '../components/Order';
import { Timer } from '../components/timer';
import { ActionError } from '../components/ActionError';
import { spawnOrderPurchase } from '../factories/Order-factory';
import { loadData } from '../data/registry';
import { MoneySystem } from './MoneySystem';
import { OrderSystem } from './OrderSystem';
import { ActionSystem } from './ActionSystem';

let world: World;
let buyer: number;

describe('OrderSystem', () => {
  beforeEach(() => {
    world = new World();
    world.addSystem(new MoneySystem());
    world.addSystem(new OrderSystem());
    world.addSystem(new ActionSystem());
    buyer = world.createEntity();
  });

  it('should place a paid order with a delivery timer', () => {
    const { price, deliveryTime } = loadData('machineOrders', 'gumball-single');
    world.addEntityComponents(buyer, new Money(price));
    spawnOrderPurchase(world, buyer, 'machineOrders', 'gumball-single');

    world.update(0);

    const money = world.getEntityComponents(buyer)!.get(Money)!;
    expect(money.value).toBe(0);
    const orders = world.view(Order, Timer);
    expect(orders.length).toBe(1);
    const [[_order, components]] = orders;
    expect(components.get(Order)).toMatchObject({
      source: 'machineOrders',
      id: 'gumball-single',
    });
    expect(components.get(Timer).duration).toBe(deliveryTime * 1000);
  });

  it('should not place an order the buyer cannot afford', () => {
    const { price } = loadData('productOrders', 'bubblegumbox');
    world.addEntityComponents(buyer, new Money(price - 1));
    spawnOrderPurchase(world, buyer, 'productOrders', 'bubblegumbox');

    world.update(0);

    expect(world.view(Order).length).toBe(0);
    expect(world.view(ActionError).length).toBe(1);
    expect(world.getEntityComponents(buyer)!.get(Money)!.value).toBe(price - 1);
  });

  it('should place each order only once', () => {
    world.addEntityComponents(buyer, new Money(1000));
    spawnOrderPurchase(world, buyer, 'productOrders', 'bubblegumbox');

    world.update(0);
    world.update(0);

    expect(world.view(Order).length).toBe(1);
  });
});
