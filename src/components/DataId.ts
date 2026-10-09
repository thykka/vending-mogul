import { Component } from '@jakeklassen/ecs';
import type {
  ProductId,
  SpriteId,
  LocationId,
  MachineId,
  SlotId,
} from '@data/registry';

export class DataId<Id extends string> extends Component {
  constructor(public id: Id) {
    super();
  }
}

export class LocationDataId extends DataId<LocationId> {}
export class ProductDataId extends DataId<ProductId> {}
export class SpriteDataId extends DataId<SpriteId> {}
export class MachineDataId extends DataId<MachineId> {}
export class SlotDataId extends DataId<SlotId> {}
