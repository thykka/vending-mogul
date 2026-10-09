import { Flex } from '../../Flex/Flex';
import { allData, allIds } from '../../../../data/registry';
import { ShopOrder } from './ShopOrder';

export function ShopMachinesView() {
  const orders = allData('machineOrders');
  return (
    <Flex>
      {allIds('machineOrders').map((id) => (
        <ShopOrder source="machineOrders" id={id} key={id}>
          {orders[id].machine}
        </ShopOrder>
      ))}
    </Flex>
  );
}
