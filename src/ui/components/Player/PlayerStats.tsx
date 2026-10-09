import { useGameView } from '@ui/hooks/useGameView';
import { Name } from '@components/Name';
import { Money } from '@components/Money';
import { Flex } from '@ui/components/Flex/Flex';

export function PlayerStats() {
  const [[_player, components]] = useGameView(Name, Money);
  const name = components.get(Name).text;
  const money = components.get(Money).value;
  return (
    <Flex horizontal fit>
      <Flex pad fit verticalCenter type="h2">
        {name}
      </Flex>
      <Flex center type="span">
        money: {money}
      </Flex>
    </Flex>
  );
}
