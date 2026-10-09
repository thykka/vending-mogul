import { Flex } from '@ui/components/Flex/Flex';
import { useGameView } from '@ui/hooks/useGameView';
import { useGame } from '@ui/context/GameContext';
import { useNavigation } from '@ui/context/NavigationContext';
import { Children } from '@components/Children';
import { LocationDataId, MachineDataId } from '@components/DataId';
import { Parent } from '@components/Parent';
import { Money } from '@components/Money';
import { MoneyLimit } from '@components/MoneyLimit';
import { formatCurrency } from '@ui/utils/formatter';
import { MachineSlot } from './MachineSlot';

export function MachineView() {
  const game = useGame();
  const { viewedMachine } = useNavigation();
  // Re-render as the game updates
  useGameView(MachineDataId);
  const components =
    viewedMachine === null
      ? undefined
      : game.getEntityComponents(viewedMachine);
  const id = components?.get(MachineDataId)?.id;
  if (!components || !id) return <span>No machine selected</span>;
  const parent = components.get(Parent)?.entity;
  const location =
    parent === null || parent === undefined
      ? undefined
      : game.getEntityComponents(parent)?.get(LocationDataId)?.id;
  const slots = [...(components.get(Children)?.entities ?? [])];
  const money = components.get(Money)?.value ?? 0;
  const moneyLimit = components.get(MoneyLimit)?.value ?? 0;
  return (
    <Flex>
      <h2>{id}</h2>
      {location && <span>at {location}</span>}
      <span>
        Money: {formatCurrency(money)} / {formatCurrency(moneyLimit)}
      </span>
      <h3>Slots</h3>
      {slots.map((slot) => (
        <MachineSlot slot={slot} key={slot} />
      ))}
    </Flex>
  );
}
