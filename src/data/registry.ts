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
export type RegistryKey<Source extends RegistrySource> =
  keyof DataRegistry[Source] & string;

export function loadData<Source extends RegistrySource>(
  source: Source,
  id: RegistryKey<Source>
): DataRegistry[Source][RegistryKey<Source>] {
  const table = DataRegistry[source];
  if (!(id in table)) throw new Error(`Unknown ${source} id: ${id}`);
  return table[id];
}

export function allData<Source extends RegistrySource>(
  source: Source
): DataRegistry[Source] {
  return DataRegistry[source];
}

export function allIds<Source extends RegistrySource>(
  source: Source
): RegistryKey<Source>[] {
  return Object.keys(DataRegistry[source]) as RegistryKey<Source>[];
}

export type ProductId = RegistryKey<'products'>;
export type SpriteId = RegistryKey<'sprites'>;
export type MachineId = RegistryKey<'machines'>;
export type LocationId = RegistryKey<'locations'>;
export type SlotId = RegistryKey<'slots'>;
export type MachineOrderId = RegistryKey<'machineOrders'>;
export type ProductOrderId = RegistryKey<'productOrders'>;

export type OrderSource = 'machineOrders' | 'productOrders';

/** Fields shared by every kind of order. */
export type OrderData = { price: number; deliveryTime: number };

/**
 * `loadData` for either kind of order. TypeScript can't resolve the fields of
 * `loadData(source, id)` while `source` is a generic OrderSource, so this reads
 * the table as OrderData, which also checks that both tables provide its fields.
 */
export function loadOrderData(source: OrderSource, id: string): OrderData {
  const table: Record<string, OrderData> = DataRegistry[source];
  if (!(id in table)) throw new Error(`Unknown ${source} id: ${id}`);
  return table[id];
}
