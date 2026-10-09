import { Flex } from '../../Flex/Flex';
import { useGameView } from '../../../hooks/useGameView.js';
import { LocationDataId } from '../../../../components/DataId';
import { Name } from '../../../../components/Name';
import { Locked } from '../../../../components/Locked';
import { UnlockPrice } from '../../../../components/UnlockPrice';
import { formatCurrency } from '../../../utils/formatter';
import { useGameMutate } from '../../../hooks/useGameMutate';
import { useGame } from '../../../context/GameContext';
import { Player } from '../../../../components/Player';
import { Money } from '../../../../components/Money';

export function ShopLocationsView() {
  const { removeComponents } = useGameMutate();
  const game = useGame();
  const player = game.findEntity(Player)!;
  const playerMoney = game.getEntityComponents(player)?.get(Money)?.value || -1;
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
                  onClick={() => removeComponents(location, Locked)}
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
