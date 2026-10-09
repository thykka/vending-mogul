import { Flex } from '@ui/components/Flex/Flex';
import { allData, allIds } from '@data/registry';
import { ShopOrder } from './ShopOrder';

export function ShopProductsView() {
  const orders = allData('productOrders');
  return (
    <Flex>
      {allIds('productOrders').map((id) => (
        <ShopOrder source="productOrders" id={id} key={id}>
          <Flex>
            {id}
            {orders[id].products.map(({ product, amount }) => (
              <small key={product}>
                {amount} × {product}
              </small>
            ))}
          </Flex>
        </ShopOrder>
      ))}
    </Flex>
  );
}
