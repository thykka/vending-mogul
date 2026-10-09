import { Component, EntityId } from '@jakeklassen/ecs';

/** Charges `buyer` the `cost`, marking the action as Paid if they can afford it. */
export class BuyAction extends Component {
  constructor(
    public buyer: EntityId,
    public cost: number
  ) {
    super();
  }
}
