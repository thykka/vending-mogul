import { System, World, type EntityId } from '@jakeklassen/ecs';
import { Sales } from '@components/Sales';
import { Money } from '@components/Money';
import { MoneyLimit } from '@components/MoneyLimit';
import { Parent } from '@components/Parent';
import { Children } from '@components/Children';
import { Contents } from '@components/Contents';
import { Amount } from '@components/Amount';
import { SalePrice } from '@components/SalePrice';

type StockedSlot = {
  contents: Contents;
  product: EntityId;
  amount: Amount;
  price: SalePrice;
};

/**
 * Installed machines sell one product per sales interval from a random
 * stocked Slot. A sale that would exceed the machine's MoneyLimit is skipped.
 * The sales interval is paused while the machine has nothing it can sell.
 */
export class SalesSystem extends System {
  constructor(private readonly random: () => number = Math.random) {
    super();
  }

  update(world: World, dt: number) {
    for (const [_machine, components] of world.view(
      Sales,
      Money,
      MoneyLimit,
      Parent,
      Children
    )) {
      const sales = components.get(Sales);
      const money = components.get(Money);
      const limit = components.get(MoneyLimit);
      const children = components.get(Children);
      if (!this.canSell(world, money, limit, children)) continue;
      sales.elapsed += dt;
      while (sales.elapsed >= sales.interval) {
        sales.elapsed -= sales.interval;
        this.sell(world, money, limit, children);
        if (!this.canSell(world, money, limit, children)) {
          sales.elapsed = 0;
          break;
        }
      }
    }
  }

  /** True if any stocked product could be sold without exceeding the limit. */
  canSell(world: World, money: Money, limit: MoneyLimit, children: Children) {
    return this.stockedSlots(world, children).some(
      ({ price }) => money.value + price.value <= limit.value
    );
  }

  sell(world: World, money: Money, limit: MoneyLimit, children: Children) {
    const stocked = this.stockedSlots(world, children);
    if (!stocked.length) return;
    const { contents, product, amount, price } =
      stocked[Math.floor(this.random() * stocked.length)];
    if (money.value + price.value > limit.value) return;
    money.value += price.value;
    amount.value -= 1;
    if (amount.value <= 0) {
      world.deleteEntity(product);
      contents.item = null;
    }
  }

  stockedSlots(world: World, children: Children): StockedSlot[] {
    const stocked: StockedSlot[] = [];
    for (const slot of children.entities) {
      const contents = world.getEntityComponents(slot)?.get(Contents);
      if (!contents || contents.item === null) continue;
      const product = contents.item;
      const productComponents = world.getEntityComponents(product);
      const amount = productComponents?.get(Amount);
      const price = productComponents?.get(SalePrice);
      if (amount && price) stocked.push({ contents, product, amount, price });
    }
    return stocked;
  }
}
