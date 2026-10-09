import type { ReactNode } from 'react';
import { Flex } from '../../Flex/Flex';
import { useGameView } from '../../../hooks/useGameView.js';
import { useGame } from '../../../context/GameContext';
import { Player } from '../../../../components/Player';
import { Money } from '../../../../components/Money';
import { formatCurrency } from '../../../utils/formatter';
import { spawnOrderPurchase } from '../../../../factories/Order-factory';
import {
  loadOrderData,
  type DataId,
  type OrderSource,
} from '../../../../data/registry';

type ShopOrderProps<S extends OrderSource> = {
  source: S;
  id: DataId<S>;
  children: ReactNode;
};

export function ShopOrder<S extends OrderSource>({
  source,
  id,
  children,
}: ShopOrderProps<S>) {
  const game = useGame();
  const [[player, playerComponents]] = useGameView(Player, Money);
  const playerMoney = playerComponents.get(Money).value;
  const { price, deliveryTime } = loadOrderData(source, id);
  const canAfford = price <= playerMoney;
  return (
    <Flex horizontal pad fit gap>
      <Flex fit verticalCenter>
        {children}
      </Flex>
      <Flex center>{deliveryTime}s</Flex>
      <Flex center>{formatCurrency(price)}</Flex>
      {canAfford ? (
        <Flex
          pad
          theme="invert"
          type="button"
          onClick={() => spawnOrderPurchase(game, player, source, id)}
        >
          Order
        </Flex>
      ) : (
        <Flex pad>Cannot afford</Flex>
      )}
    </Flex>
  );
}
