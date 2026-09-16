import { Component } from '@jakeklassen/ecs';

export class BuyAction extends Component {
  constructor(
    public buyer: number,
    public buyable: number
  ) {
    super();
  }
}
