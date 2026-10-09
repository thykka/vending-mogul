import { useGameView } from '@ui/hooks/useGameView';
import { ActionError } from '@components/ActionError';
import { formatError } from '@shared/errors';
import { Flex } from '@ui/components/Flex/Flex';

export function ActionErrors() {
  const errors = useGameView(ActionError);
  if (!errors.length) return null;
  return (
    <Flex gap type="ul">
      {errors.map(([entity, components]) => {
        const { errorId, meta } = components.get(ActionError);
        return (
          <Flex pad theme="invert" type="li" key={entity}>
            {formatError(errorId, meta)}
          </Flex>
        );
      })}
    </Flex>
  );
}
