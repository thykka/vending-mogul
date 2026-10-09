import { useGameView } from '@ui/hooks/useGameView';
import { Name } from '@components/Name';
import { Money } from '@components/Money';
import { Player } from '@components/Player';
import { Flex } from '@ui/components/Flex/Flex';
import { formatCurrency } from '@ui/utils/formatter';

export function PlayerStats() {
  const [[_player, components]] = useGameView(Player, Name, Money);
  const name = components.get(Name).text;
  const money = components.get(Money).value;
  return (
    <Flex horizontal fit>
      <Flex pad fit verticalCenter type="h2">
        {name}
      </Flex>
      <Flex center type="span">
        money: {formatCurrency(money)}
      </Flex>
    </Flex>
  );
}
