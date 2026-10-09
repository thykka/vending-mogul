import { Component, EntityId } from '@jakeklassen/ecs';

/** Moves products from a stored `product` stack into `slot`. */
export class StockAction extends Component {
  constructor(
    public product: EntityId,
    public slot: EntityId
  ) {
    super();
  }
}
