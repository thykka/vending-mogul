import { formatCurrency } from '@ui/utils/formatter';

type NoMeta = Record<string, never>;

export const Errors = {
  noEntity: ({ entity }: { entity: number }) => `Entity ${entity} not found`,
  buyNotEnoughMoney: ({ amount }: { amount: number }) =>
    `Cannot buy: Missing ${formatCurrency(amount)}`,
  buyNoMoney: (_: NoMeta) => 'Cannot buy: Buyer has no Money',
  unlockNotLocked: (_: NoMeta) => 'Cannot unlock: Already unlocked',
  installNotStored: (_: NoMeta) => 'Cannot install: Machine is not in Storage',
  installLocationLocked: (_: NoMeta) => 'Cannot install: Location is locked',
  installLocationFull: (_: NoMeta) => 'Cannot install: Location is full',
  stockNotStored: (_: NoMeta) => 'Cannot stock: Product is not in Storage',
  stockNoFit: (_: NoMeta) => 'Cannot stock: Product does not fit the slot',
  stockSlotOccupied: (_: NoMeta) =>
    'Cannot stock: Slot holds a different product',
  stockSlotFull: (_: NoMeta) => 'Cannot stock: Slot is full',
} as const;

export type ErrorId = keyof typeof Errors;
export type ErrorMeta<T extends ErrorId> = Parameters<(typeof Errors)[T]>[0];

export function formatError<T extends ErrorId>(errorId: T, meta: ErrorMeta<T>) {
  const format = Errors[errorId] as (meta: ErrorMeta<T>) => string;
  return format(meta);
}
