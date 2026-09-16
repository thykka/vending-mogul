import { formatCurrency } from '../ui/utils/formatter';

type NoMeta = Record<string, never>;

export const Errors = {
  buyNotEnoughMoney: ({ amount }: { amount: number }) =>
    `Cannot buy: Missing ${formatCurrency(amount)}`,
  buyNoMoney: (_: NoMeta) => 'Cannot buy: Buyer has no Money',
  buyNoCost: (_: NoMeta) => 'Cannot buy: Target has no cost',
} as const;

export type ErrorId = keyof typeof Errors;
export type ErrorMeta<T extends ErrorId> = Parameters<(typeof Errors)[T]>[0];
