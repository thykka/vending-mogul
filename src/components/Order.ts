import { Component } from '@jakeklassen/ecs';
import type { RegistryKey, OrderSource } from '@data/registry';

/** An order placed by the player, waiting for delivery. */
export class Order<S extends OrderSource = OrderSource> extends Component {
  constructor(
    public source: S,
    public id: RegistryKey<S>
  ) {
    super();
  }
}
