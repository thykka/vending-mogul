import { Component } from '@jakeklassen/ecs';
import { ErrorId, ErrorMeta } from '@shared/errors';

export class ActionError<T extends ErrorId> extends Component {
  constructor(
    public errorId: T,
    public meta: ErrorMeta<T>
  ) {
    super();
  }
}
