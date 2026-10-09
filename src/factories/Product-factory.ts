import type { EntityId, World } from '@jakeklassen/ecs';
import { type ProductId, type SpriteId, loadData } from '@data/registry';
import { ProductDataId } from '@components/DataId';

import { Amount } from '@components/Amount';
import { Position } from '@components/Position';
import { SalePrice } from '@components/SalePrice';
import { Sprite } from '@components/Sprite';
import { Shape } from '@components/Shape';
import { Size } from '@components/Size';

export function spawnProductStack(
  world: World,
  id: ProductId,
  amount: number,
  x = 0,
  y = 0
): EntityId {
  const productData = loadData('products', id);
  const spriteData = loadData('sprites', productData.sprite as SpriteId);

  const entity = world.createEntity();
  world.addEntityComponents(
    entity,
    new ProductDataId(id),
    new Amount(amount),
    new Position(x, y),
    new SalePrice(productData.salePrice),
    new Sprite(...spriteData.source),
    new Shape(productData.shape),
    new Size(productData.width, productData.height)
  );
  return entity;
}
