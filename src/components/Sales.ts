import { Component } from '@jakeklassen/ecs';

/** A machine attempts one sale every `interval` ms of game time. */
export class Sales extends Component {
  constructor(
    public interval: number,
    public elapsed = 0
  ) {
    super();
  }
}
