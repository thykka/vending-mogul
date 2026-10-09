import type { EntityId } from '@jakeklassen/ecs';
import { Flex } from '@ui/components/Flex/Flex';
import { useGameView } from '@ui/hooks/useGameView';
import { useGame } from '@ui/context/GameContext';
import { Amount } from '@components/Amount';
import { Contents } from '@components/Contents';
import { ProductDataId } from '@components/DataId';
import { ProductCapacity } from '@components/ProductCapacity';
import { Shape } from '@components/Shape';
import { Size } from '@components/Size';
import { Stored } from '@components/Stored';
import { spawnStockAction } from '@factories/Action-factory';
import { canStock, slotStack } from '@shared/queries';

export function MachineSlot({ slot }: { slot: EntityId }) {
  const game = useGame();
  const storedProducts = useGameView(ProductDataId, Amount, Stored);
  const slotComponents = game.getEntityComponents(slot);
  const contents = slotComponents?.get(Contents);
  const capacity = slotComponents?.get(ProductCapacity)?.value ?? 0;
  if (!slotComponents || !contents) return null;
  const shape = slotComponents.get(Shape)?.id;
  const size = slotComponents.get(Size);
  const stocked = slotStack(game, slotComponents);
  const stockedId = stocked?.get(ProductDataId)?.id;
  const amount = stocked?.get(Amount)?.value ?? 0;
  const stockable = storedProducts.filter(([_product, components]) =>
    canStock(game, components, slotComponents)
  );
  return (
    <Flex pad gap>
      <Flex horizontal gap>
        <Flex fit verticalCenter>
          {shape} {size?.w}×{size?.h}: {stockedId ?? 'empty'}
        </Flex>
        <Flex center>
          {amount}/{capacity}
        </Flex>
      </Flex>
      {amount < capacity && (
        <Flex horizontal wrap gap>
          {stockable.length ? (
            stockable.map(([product, components]) => (
              <Flex
                pad
                theme="invert"
                type="button"
                key={product}
                onClick={() => spawnStockAction(game, product, slot)}
              >
                Stock {components.get(ProductDataId).id}
              </Flex>
            ))
          ) : (
            <Flex pad>No fitting products in storage</Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
}
