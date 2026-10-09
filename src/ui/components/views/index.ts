import { LocationsView } from './Locations';
import { MachineView } from './Machine/Machine';
import { OrdersView } from './Orders';
import { ShopView } from './Shop/Shop';
import { StorageView } from './Storage';

export const Views = {
  shop: {
    name: 'Shop',
    component: ShopView,
  },
  orders: {
    name: 'Orders',
    component: OrdersView,
  },
  storage: {
    name: 'Storage',
    component: StorageView,
  },
  map: {
    name: 'Map',
    component: LocationsView,
  },
  machine: {
    name: 'Machine',
    component: MachineView,
  },
};
