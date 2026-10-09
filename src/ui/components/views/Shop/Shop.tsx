import { useState } from 'react';
import { ViewId, ViewList, ViewPanel } from '@ui/components/View/View';
import { Flex } from '@ui/components/Flex/Flex';
import { ShopLocationsView } from './Locations';
import { ShopMachinesView } from './Machines';
import { ShopProductsView } from './Products';
import { ShopUpgradesView } from './Upgrades';

const ShopViews = {
  locations: {
    name: 'Locations',
    component: ShopLocationsView,
  },
  machines: {
    name: 'Machines',
    component: ShopMachinesView,
  },
  products: {
    name: 'Products',
    component: ShopProductsView,
  },
  upgrades: {
    name: 'Upgrades',
    component: ShopUpgradesView,
  },
};

export function ShopView() {
  const [currentView, setCurrentView] =
    useState<ViewId<typeof ShopViews>>('locations');

  return (
    <Flex>
      <h2>Shop</h2>
      <Flex fit horizontal gap type="ul">
        <ViewList
          views={ShopViews}
          current={currentView}
          onChange={setCurrentView}
          renderItem={({ viewId: itemId, view, isActive, select }) => (
            <Flex fit type="li" key={itemId}>
              {isActive ? (
                <Flex pad center theme="invert">
                  {view.name}
                </Flex>
              ) : (
                <Flex pad center type="button" onClick={select}>
                  {view.name}
                </Flex>
              )}
            </Flex>
          )}
        />
      </Flex>
      <ViewPanel views={ShopViews} viewId={currentView} />
    </Flex>
  );
}
