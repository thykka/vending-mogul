import { Component } from '@jakeklassen/ecs';
import type { DataId, OrderSource } from '../data/registry';

/** An order placed by the player, waiting for delivery. */
export class Order<S extends OrderSource = OrderSource> extends Component {
  constructor(
    public source: S,
    public id: DataId<S>
  ) {
    super();
  }
}
