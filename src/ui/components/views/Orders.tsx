import { Flex } from '@ui/components/Flex/Flex';
import { useGameView } from '@ui/hooks/useGameView';
import { Order } from '@components/Order';
import { Timer } from '@components/Timer';

export function OrdersView() {
  const orders = useGameView(Order, Timer);
  return (
    <Flex>
      <h2>Orders</h2>
      {orders.length ? (
        orders.map(([entity, components]) => {
          const { id } = components.get(Order);
          const timer = components.get(Timer);
          const remaining = Math.ceil((timer.duration - timer.elapsed) / 1000);
          return (
            <Flex horizontal pad fit gap key={entity}>
              <Flex fit verticalCenter>
                {id}
              </Flex>
              <Flex center>
                <progress value={timer.progress} max={1} />
              </Flex>
              <Flex center>{remaining}s</Flex>
            </Flex>
          );
        })
      ) : (
        <span>No pending orders</span>
      )}
    </Flex>
  );
}
