import { World } from '@jakeklassen/ecs';
import { Money } from '@components/Money';
import { MoneyLimit } from '@components/MoneyLimit';
import { Amount } from '@components/Amount';
import { Children } from '@components/Children';
import { Contents } from '@components/Contents';
import { spawnMachine } from '@factories/Machine-factory';
import { spawnProductStack } from '@factories/Product-factory';
import { loadData, type MachineId } from '@data/registry';
import { SalesSystem } from './SalesSystem';

let world: World;

const { salePrice } = loadData('products', 'bubblegum');

function spawnInstalledMachine(id: MachineId = 'gumball-single') {
  const location = world.createEntity();
  return spawnMachine(world, id, location);
}

function slotsOf(machine: number) {
  return [...world.getEntityComponents(machine)!.get(Children)!.entities];
}

function contentsOf(slot: number) {
  return world.getEntityComponents(slot)!.get(Contents)!;
}

function stock(slot: number, amount: number) {
  const product = spawnProductStack(world, 'bubblegum', amount);
  contentsOf(slot).item = product;
  return product;
}

function moneyOf(machine: number) {
  return world.getEntityComponents(machine)!.get(Money)!;
}

function amountOf(product: number) {
  return world.getEntityComponents(product)?.get(Amount)?.value;
}

function intervalOf(id: MachineId) {
  return loadData('machines', id).salesInterval * 1000;
}

describe('SalesSystem', () => {
  beforeEach(() => {
    world = new World();
    world.addSystem(new SalesSystem(() => 0));
  });

  it('should sell one product per sales interval', () => {
    const machine = spawnInstalledMachine();
    const product = stock(slotsOf(machine)[0], 10);

    world.update(intervalOf('gumball-single') - 1);
    expect(amountOf(product)).toBe(10);

    world.update(1);
    expect(amountOf(product)).toBe(9);
    expect(moneyOf(machine).value).toBe(salePrice);
  });

  it('should sell once for every interval that passed', () => {
    const machine = spawnInstalledMachine();
    const product = stock(slotsOf(machine)[0], 10);

    world.update(intervalOf('gumball-single') * 3);

    expect(amountOf(product)).toBe(7);
    expect(moneyOf(machine).value).toBe(3 * salePrice);
  });

  it('should not sell from machines that are not installed', () => {
    const machine = spawnMachine(world, 'gumball-single');
    const product = stock(slotsOf(machine)[0], 10);

    world.update(intervalOf('gumball-single'));

    expect(amountOf(product)).toBe(10);
    expect(moneyOf(machine).value).toBe(0);
  });

  it('should empty a slot once it sells out', () => {
    const machine = spawnInstalledMachine();
    const [slot] = slotsOf(machine);
    const product = stock(slot, 1);

    world.update(intervalOf('gumball-single'));

    expect(contentsOf(slot).item).toBeNull();
    expect(world.getEntityComponents(product)).toBeUndefined();
  });

  it('should not sell if the sale would exceed the money limit', () => {
    const machine = spawnInstalledMachine();
    const product = stock(slotsOf(machine)[0], 10);
    const limit = world.getEntityComponents(machine)!.get(MoneyLimit)!.value;
    moneyOf(machine).value = limit - salePrice + 1;

    world.update(intervalOf('gumball-single'));

    expect(amountOf(product)).toBe(10);
    expect(moneyOf(machine).value).toBe(limit - salePrice + 1);
  });

  it('should sell up to exactly the money limit', () => {
    const machine = spawnInstalledMachine();
    stock(slotsOf(machine)[0], 10);
    const limit = world.getEntityComponents(machine)!.get(MoneyLimit)!.value;
    moneyOf(machine).value = limit - salePrice;

    world.update(intervalOf('gumball-single'));

    expect(moneyOf(machine).value).toBe(limit);
  });

  it('should pick a random stocked slot', () => {
    world = new World();
    world.addSystem(new SalesSystem(() => 0.99));
    const machine = spawnInstalledMachine('gumball-row');
    const [first, , , last] = slotsOf(machine);
    const firstProduct = stock(first, 10);
    const lastProduct = stock(last, 10);

    world.update(intervalOf('gumball-row'));

    expect(amountOf(firstProduct)).toBe(10);
    expect(amountOf(lastProduct)).toBe(9);
  });
});
