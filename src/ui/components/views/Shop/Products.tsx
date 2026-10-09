import { Flex } from '@ui/components/Flex/Flex';
import { allData, allIds, loadData, type ProductId } from '@data/registry';
import { ShopOrder } from './ShopOrder';

export function ShopProductsView() {
  const orders = allData('productOrders');
  return (
    <Flex>
      {allIds('productOrders').map((id) => (
        <ShopOrder source="productOrders" id={id} key={id}>
          <Flex>
            {id}
            {orders[id].products.map(({ product, stacks }) => (
              <small key={product}>
                {stacks} × {product} (
                {loadData('products', product as ProductId).stackSize})
              </small>
            ))}
          </Flex>
        </ShopOrder>
      ))}
    </Flex>
  );
}
