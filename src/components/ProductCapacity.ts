import { Component } from '@jakeklassen/ecs';

/** How many products a Slot can hold. */
export class ProductCapacity extends Component {
  constructor(public value: number) {
    super();
  }
}
