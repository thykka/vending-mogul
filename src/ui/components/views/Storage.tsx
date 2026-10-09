import { Flex } from '@ui/components/Flex/Flex';
import { useGameView } from '@ui/hooks/useGameView';
import { Stored } from '@components/Stored';
import { Amount } from '@components/Amount';
import { MachineDataId, ProductDataId } from '@components/DataId';
import { loadData, type SlotId } from '@data/registry';

type Dimensions = { shape: string; width: number; height: number };

const formatDimensions = ({ shape, width, height }: Dimensions) =>
  `${shape} ${width}×${height}`;

/** E.g. "4 × ball 1×1", grouping slots with the same dimensions. */
function formatSlots(slots: SlotId[]) {
  const counts = new Map<string, number>();
  for (const slot of slots) {
    const dimensions = formatDimensions(loadData('slots', slot));
    counts.set(dimensions, (counts.get(dimensions) ?? 0) + 1);
  }
  return [...counts].map(([dims, count]) => `${count} × ${dims}`).join(', ');
}

function StoredMachines() {
  const machines = useGameView(MachineDataId, Stored);
  if (!machines.length) return <span>No machines in storage</span>;
  return machines.map(([entity, components]) => {
    const { id } = components.get(MachineDataId);
    const slots = loadData('machines', id).slots.flat() as SlotId[];
    return (
      <Flex horizontal pad fit gap key={entity}>
        <Flex fit verticalCenter>
          {id}
        </Flex>
        <Flex center>{formatSlots(slots)}</Flex>
      </Flex>
    );
  });
}

function StoredProducts() {
  const products = useGameView(ProductDataId, Amount, Stored);
  if (!products.length) return <span>No products in storage</span>;
  return products.map(([entity, components]) => {
    const { id } = components.get(ProductDataId);
    const amount = components.get(Amount).value;
    return (
      <Flex horizontal pad fit gap key={entity}>
        <Flex fit verticalCenter>
          {id}
        </Flex>
        <Flex center>{formatDimensions(loadData('products', id))}</Flex>
        <Flex center>× {amount}</Flex>
      </Flex>
    );
  });
}

export function StorageView() {
  return (
    <Flex>
      <h2>Storage</h2>
      <h3>Machines</h3>
      <StoredMachines />
      <h3>Products</h3>
      <StoredProducts />
    </Flex>
  );
}
