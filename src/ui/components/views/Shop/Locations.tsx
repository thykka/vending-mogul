import { Flex } from '../../Flex/Flex';
import { useGameView } from '../../../hooks/useGameView.js';
import { LocationDataId } from '../../../../components/DataId';
import { Name } from '../../../../components/Name';
import { Locked } from '../../../../components/Locked';
import { UnlockPrice } from '../../../../components/UnlockPrice';
import { formatCurrency } from '../../../utils/formatter';
import { useGame } from '../../../context/GameContext';
import { Player } from '../../../../components/Player';
import { Money } from '../../../../components/Money';
import { spawnUnlockPurchase } from '../../../../factories/Action-factory';

export function ShopLocationsView() {
  const game = useGame();
  const player = game.findEntity(Player)!;
  const playerMoney = game.getEntityComponents(player)?.get(Money)?.value ?? 0;
  const locations = useGameView(LocationDataId);
  return (
    <Flex>
      {locations.length ? (
        locations.map(([location, components]) => {
          const name = components.get(Name).text;
          const locked = !!components.get(Locked);
          const unlockPrice = components.get(UnlockPrice).value;
          const canAfford = unlockPrice <= playerMoney;
          return (
            <Flex horizontal pad fit gap key={location}>
              <Flex center>{locked ? '🔒' : '📍'}</Flex>
              <Flex fit verticalCenter>
                {name}
              </Flex>
              {locked && <Flex center>{formatCurrency(unlockPrice)}</Flex>}
              {locked && canAfford && (
                <Flex
                  pad
                  theme="invert"
                  type="button"
                  onClick={() => spawnUnlockPurchase(game, player, location)}
                >
                  Unlock
                </Flex>
              )}
              {locked && !canAfford && <Flex pad>Cannot afford</Flex>}
            </Flex>
          );
        })
      ) : (
        <span>{'No locations available'}</span>
      )}
    </Flex>
  );
}
