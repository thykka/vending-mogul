import { useGameView } from '../../hooks/useGameView.js';
import { ActionError } from '../../../components/ActionError.js';
import { formatError } from '../../../shared/errors.js';
import { Flex } from '../Flex/Flex.js';

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
