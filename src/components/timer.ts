import { Component } from '@jakeklassen/ecs';

/** Counts elapsed game time (ms) up to `duration`. */
export class Timer extends Component {
  constructor(
    public duration: number,
    public elapsed = 0
  ) {
    super();
  }

  get progress() {
    return this.duration > 0 ? this.elapsed / this.duration : 1;
  }

  get completed() {
    return this.elapsed >= this.duration;
  }
}
