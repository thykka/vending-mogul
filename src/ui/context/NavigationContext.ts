import { createContext, useContext } from 'react';
import type { EntityId } from '@jakeklassen/ecs';
import type { ShopViewId } from '@ui/components/views/Shop/Shop';

type Navigation = {
  /** Last machine opened in the Machine view, if any. */
  viewedMachine: EntityId | null;
  viewMachine: (machine: EntityId) => void;
  /** Last selected Shop tab, kept while other views are open. */
  shopTab: ShopViewId;
  setShopTab: (tab: ShopViewId) => void;
};

export const NavigationContext = createContext<Navigation | null>(null);
export function useNavigation() {
  const navigation = useContext(NavigationContext);
  if (!navigation)
    throw new Error('useNavigation must be used inside <NavigationContext>');
  return navigation;
}
