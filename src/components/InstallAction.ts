import { Component, EntityId } from '@jakeklassen/ecs';

/** Installs a stored `machine` at `location`. */
export class InstallAction extends Component {
  constructor(
    public machine: EntityId,
    public location: EntityId
  ) {
    super();
  }
}
