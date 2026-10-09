import { MachineView } from '@ui/components/views/Machine/Machine';
import { MapView } from './Map';
import { OrdersView } from './Orders';
import { ShopView } from '@ui/components/views/Shop/Shop';
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
    component: MapView,
  },
  machine: {
    name: 'Machine',
    component: MachineView,
  },
};
