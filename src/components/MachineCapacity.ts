import { Component } from '@jakeklassen/ecs';

/** How many machines can be installed at a Location. */
export class MachineCapacity extends Component {
  constructor(public value: number) {
    super();
  }
}
