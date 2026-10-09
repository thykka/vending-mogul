import { Component } from '@jakeklassen/ecs';

/** The most Money a machine can hold before it must be collected. */
export class MoneyLimit extends Component {
  constructor(public value: number) {
    super();
  }
}
