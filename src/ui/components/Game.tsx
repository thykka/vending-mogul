import { game, startLoop, stopLoop } from '@/game';
import { Flex } from '@ui/components/Flex/Flex';
import { GameContext } from '@ui/context/GameContext';
import { NavigationContext } from '@ui/context/NavigationContext';
import { PlayerStats } from '@ui/components/Player/PlayerStats';
import { useEffect, useState } from 'react';
import type { EntityId } from '@jakeklassen/ecs';
import { ViewList, ViewPanel, type ViewId } from '@ui/components/View/View';
import { Views } from '@ui/components/views';
import { ActionErrors } from '@ui/components/ActionErrors/ActionErrors';
import type { ShopViewId } from '@ui/components/views/Shop/Shop';

export function Game() {
  const [currentView, setCurrentView] = useState<ViewId<typeof Views>>('shop');
  const [viewedMachine, setViewedMachine] = useState<EntityId | null>(null);
  const [shopTab, setShopTab] = useState<ShopViewId>('locations');
  const viewMachine = (machine: EntityId) => {
    setViewedMachine(machine);
    setCurrentView('machine');
  };
  useEffect(() => {
    startLoop();
    return () => stopLoop();
  }, []);

  return (
    <GameContext.Provider value={game}>
      <NavigationContext.Provider
        value={{ viewedMachine, viewMachine, shopTab, setShopTab }}
      >
        <Flex fit clip pad>
          <Flex horizontal gap type="section">
            <Flex center>Clock</Flex>
            <Flex horizontal fit>
              <Flex pad type="h1">
                Vending Mogul
              </Flex>
              <PlayerStats />
            </Flex>
            <Flex center>Menu</Flex>
          </Flex>
          <ActionErrors />
          <Flex fit scroll type="section">
            <ViewPanel views={Views} viewId={currentView} />
          </Flex>
          <Flex type="nav">
            <Flex horizontal gap type="ul">
              <ViewList
                views={Views}
                current={currentView}
                onChange={setCurrentView}
                renderItem={({ viewId, view, isActive, select }) => (
                  <Flex fit type="li" key={viewId}>
                    {isActive ? (
                      <Flex pad center theme="invert">
                        {view.name}
                      </Flex>
                    ) : (
                      <Flex
                        pad
                        center
                        type="button"
                        onClick={select}
                        disabled={
                          viewId === 'machine' && viewedMachine === null
                        }
                      >
                        {view.name}
                      </Flex>
                    )}
                  </Flex>
                )}
              />
            </Flex>
          </Flex>
        </Flex>
      </NavigationContext.Provider>
    </GameContext.Provider>
  );
}
