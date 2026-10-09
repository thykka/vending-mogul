import { World } from '@jakeklassen/ecs';
import { Money } from '@components/Money';
import { MoneyLimit } from '@components/MoneyLimit';
import { Amount } from '@components/Amount';
import { Children } from '@components/Children';
import { Contents } from '@components/Contents';
import { spawnCollectAction } from '@factories/Action-factory';
import { spawnMachine } from '@factories/Machine-factory';
import { spawnPlayer } from '@factories/Player-factory';
import { spawnProductStack } from '@factories/Product-factory';
import { loadData } from '@data/registry';
import { CollectSystem } from './CollectSystem';
import { SalesSystem } from './SalesSystem';
import { ActionSystem } from './ActionSystem';

let world: World;

function moneyOf(entity: number) {
  return world.getEntityComponents(entity)!.get(Money)!;
}

describe('CollectSystem', () => {
  beforeEach(() => {
    world = new World();
    world.addSystem(new CollectSystem());
    world.addSystem(new SalesSystem(() => 0));
    world.addSystem(new ActionSystem());
  });

  it('should move machine money to the collector', () => {
    const player = spawnPlayer(world);
    const machine = spawnMachine(world, 'gumball-single');
    const playerMoney = moneyOf(player).value;
    moneyOf(machine).value = 30;
    spawnCollectAction(world, machine, player);

    world.update(0);

    expect(moneyOf(player).value).toBe(playerMoney + 30);
    expect(moneyOf(machine).value).toBe(0);
  });

  it('should let a full machine sell again once collected', () => {
    const player = spawnPlayer(world);
    const machine = spawnMachine(world, 'gumball-single', world.createEntity());
    const [slot] = world.getEntityComponents(machine)!.get(Children)!.entities;
    const product = spawnProductStack(world, 'bubblegum', 10);
    world.getEntityComponents(slot)!.get(Contents)!.item = product;
    const limit = world.getEntityComponents(machine)!.get(MoneyLimit)!.value;
    moneyOf(machine).value = limit;
    const interval =
      loadData('machines', 'gumball-single').salesInterval * 1000;

    world.update(interval);
    expect(world.getEntityComponents(product)!.get(Amount)!.value).toBe(10);

    spawnCollectAction(world, machine, player);
    world.update(0);
    world.update(interval);

    expect(world.getEntityComponents(product)!.get(Amount)!.value).toBe(9);
  });
});
