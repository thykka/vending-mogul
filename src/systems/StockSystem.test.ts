import { World } from '@jakeklassen/ecs';
import { Stored } from '@components/Stored';
import { Amount } from '@components/Amount';
import { Children } from '@components/Children';
import { Contents } from '@components/Contents';
import { ProductDataId } from '@components/DataId';
import { ActionError } from '@components/ActionError';
import { spawnStockAction } from '@factories/Action-factory';
import { spawnMachine } from '@factories/Machine-factory';
import { spawnProductStack } from '@factories/Product-factory';
import { loadData, type MachineId, type ProductId } from '@data/registry';
import { StockSystem } from './StockSystem';
import { ActionSystem } from './ActionSystem';

let world: World;

function spawnSlot(machineId: MachineId = 'gumball-single') {
  const machine = spawnMachine(world, machineId);
  const [slot] = world.getEntityComponents(machine)!.get(Children)!.entities;
  return slot;
}

function spawnStored(productId: ProductId, amount: number) {
  const product = spawnProductStack(world, productId, amount);
  world.addEntityComponents(product, new Stored());
  return product;
}

function stockedIn(slot: number) {
  const { item } = world.getEntityComponents(slot)!.get(Contents)!;
  return item === null ? undefined : world.getEntityComponents(item);
}

function amountOf(entity: number) {
  return world.getEntityComponents(entity)?.get(Amount)?.value;
}

const { capacity } = loadData('slots', 'ball-s');

describe('StockSystem', () => {
  beforeEach(() => {
    world = new World();
    world.addSystem(new StockSystem());
    world.addSystem(new ActionSystem());
  });

  it('should move all stored products into an empty slot if they fit', () => {
    const slot = spawnSlot();
    const product = spawnStored('bubblegum', capacity);
    spawnStockAction(world, product, slot);

    world.update(0);

    const stocked = stockedIn(slot)!;
    expect(stocked.get(ProductDataId)?.id).toBe('bubblegum');
    expect(stocked.get(Amount)?.value).toBe(capacity);
    expect(stocked.get(Stored)).toBeUndefined();
    expect(world.getEntityComponents(product)).toBeUndefined();
  });

  it('should leave products beyond slot capacity in Storage', () => {
    const slot = spawnSlot();
    const product = spawnStored('bubblegum', capacity + 10);
    spawnStockAction(world, product, slot);

    world.update(0);

    expect(stockedIn(slot)!.get(Amount)?.value).toBe(capacity);
    expect(amountOf(product)).toBe(10);
  });

  it('should top up a slot holding the same product', () => {
    const slot = spawnSlot();
    spawnStockAction(world, spawnStored('bubblegum', 10), slot);
    world.update(0);
    const product = spawnStored('bubblegum', capacity);
    spawnStockAction(world, product, slot);

    world.update(0);

    expect(stockedIn(slot)!.get(Amount)?.value).toBe(capacity);
    expect(amountOf(product)).toBe(10);
  });

  it('should not stock a full slot', () => {
    const slot = spawnSlot();
    spawnStockAction(world, spawnStored('bubblegum', capacity), slot);
    world.update(0);
    const product = spawnStored('bubblegum', 10);
    spawnStockAction(world, product, slot);

    world.update(0);

    expect(amountOf(product)).toBe(10);
    expect(world.view(ActionError).length).toBe(1);
  });

  it('should not stock a slot holding a different product', () => {
    const slot = spawnSlot();
    const other = spawnProductStack(world, 'bouncyball', 1);
    world.getEntityComponents(slot)!.get(Contents)!.item = other;
    const product = spawnStored('bubblegum', 10);
    spawnStockAction(world, product, slot);

    world.update(0);

    expect(stockedIn(slot)!.get(ProductDataId)?.id).toBe('bouncyball');
    expect(amountOf(product)).toBe(10);
    expect(world.view(ActionError).length).toBe(1);
  });

  it('should not stock products that do not fit the slot', () => {
    const slot = spawnSlot();
    const product = spawnStored('bouncyball', 10);
    spawnStockAction(world, product, slot);

    world.update(0);

    expect(stockedIn(slot)).toBeUndefined();
    expect(amountOf(product)).toBe(10);
    expect(world.view(ActionError).length).toBe(1);
  });

  it('should not stock products that are not in Storage', () => {
    const slot = spawnSlot();
    const product = spawnProductStack(world, 'bubblegum', 10);
    spawnStockAction(world, product, slot);

    world.update(0);

    expect(stockedIn(slot)).toBeUndefined();
    expect(world.view(ActionError).length).toBe(1);
  });
});
