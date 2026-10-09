import { Component, EntityId } from '@jakeklassen/ecs';

/** Moves all Money from `machine` to `collector`. */
export class CollectAction extends Component {
  constructor(
    public machine: EntityId,
    public collector: EntityId
  ) {
    super();
  }
}
