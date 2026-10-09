import { System, World } from '@jakeklassen/ecs';
import { Sales } from '@components/Sales';
import { Money } from '@components/Money';
import { MoneyLimit } from '@components/MoneyLimit';
import { Parent } from '@components/Parent';
import { Children } from '@components/Children';
import { Contents } from '@components/Contents';
import { Amount } from '@components/Amount';
import { Price } from '@components/Price';

/**
 * Installed machines sell one product per sales interval from a random
 * stocked Slot. A sale that would exceed the machine's MoneyLimit is skipped.
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
      sales.elapsed += dt;
      while (sales.elapsed >= sales.interval) {
        sales.elapsed -= sales.interval;
        this.sell(
          world,
          components.get(Money),
          components.get(MoneyLimit),
          components.get(Children)
        );
      }
    }
  }

  sell(world: World, money: Money, limit: MoneyLimit, children: Children) {
    const stocked = [...children.entities]
      .map((slot) => world.getEntityComponents(slot)?.get(Contents))
      .filter((contents) => contents !== undefined && contents.item !== null);
    if (!stocked.length) return;
    const contents = stocked[Math.floor(this.random() * stocked.length)]!;
    const product = contents.item!;
    const productComponents = world.getEntityComponents(product);
    const amount = productComponents?.get(Amount);
    const price = productComponents?.get(Price);
    if (!amount || !price) return;
    if (money.value + price.value > limit.value) return;
    money.value += price.value;
    amount.value -= 1;
    if (amount.value <= 0) {
      world.deleteEntity(product);
      contents.item = null;
    }
  }
}
