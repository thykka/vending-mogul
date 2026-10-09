import { Component } from '@jakeklassen/ecs';
import type { RegistryKey, OrderSource } from '@data/registry';

/** Places an Order once its BuyAction has been paid for. */
export class OrderAction<
  S extends OrderSource = OrderSource,
> extends Component {
  constructor(
    public source: S,
    public id: RegistryKey<S>
  ) {
    super();
  }
}
