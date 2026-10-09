import ProductsData from './products.json';
import SpritesData from './sprites.json';
import MachinesData from './machines.json';
import LocationsData from './locations.json';
import SlotsData from './slots.json';
import MachineOrdersData from './machineOrders.json';
import ProductOrdersData from './productOrders.json';

export const DataRegistry = Object.freeze({
  locations: LocationsData,
  machines: MachinesData,
  products: ProductsData,
  sprites: SpritesData,
  slots: SlotsData,
  machineOrders: MachineOrdersData,
  productOrders: ProductOrdersData,
});

export type DataRegistry = typeof DataRegistry;
export type RegistrySource = keyof DataRegistry;
export type DataId<Source extends RegistrySource> = keyof DataRegistry[Source] &
  string;

export function loadData<Source extends RegistrySource>(
  source: Source,
  id: DataId<Source>
): DataRegistry[Source][DataId<Source>] {
  const table = DataRegistry[source];
  if (!(id in table)) throw new Error(`Unknown ${source} id: ${id}`);
  return table[id];
}

export function allData<Source extends RegistrySource>(
  source: Source
): DataRegistry[Source] {
  if (!(source in DataRegistry))
    throw new Error(`Unknown data source: ${source}`);
  return DataRegistry[source];
}

export function allIds<Source extends RegistrySource>(
  source: Source
): DataId<Source>[] {
  if (!(source in DataRegistry))
    throw new Error(`Unknown data source: ${source}`);
  return Object.keys(DataRegistry[source]) as DataId<Source>[];
}

export type ProductId = DataId<'products'>;
export type SpriteId = DataId<'sprites'>;
export type MachineId = DataId<'machines'>;
export type LocationId = DataId<'locations'>;
export type SlotId = DataId<'slots'>;
export type MachineOrderId = DataId<'machineOrders'>;
export type ProductOrderId = DataId<'productOrders'>;

export type OrderSource = 'machineOrders' | 'productOrders';

/** Fields shared by every kind of order. */
export type OrderData = { price: number; deliveryTime: number };

export function loadOrderData(source: OrderSource, id: string): OrderData {
  const table: Record<string, OrderData> = DataRegistry[source];
  if (!(id in table)) throw new Error(`Unknown ${source} id: ${id}`);
  return table[id];
}
