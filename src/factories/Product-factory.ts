import type { World } from '@jakeklassen/ecs';
import { type ProductId, type SpriteId, loadData } from '@data/registry';
import { ProductDataId } from '@components/DataId';

import { Amount } from '@components/Amount';
import { Position } from '@components/Position';
import { Price } from '@components/Price';
import { Sprite } from '@components/Sprite';
import { Shape } from '@components/Shape';

export function spawnProductStack(
  world: World,
  id: ProductId,
  x = 0,
  y = 0,
  amount?: number
): void {
  const productData = loadData('products', id);
  const spriteData = loadData('sprites', productData.sprite as SpriteId);

  const entity = world.createEntity();
  world.addEntityComponents(
    entity,
    new ProductDataId(id),
    new Amount(amount ?? productData.stackSize),
    new Position(x, y),
    new Price(productData.salePrice),
    new Sprite(...spriteData.source),
    new Shape(productData.shape)
  );
}
