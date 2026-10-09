import { game, startLoop, stopLoop } from '@/game';
import { Flex } from './Flex/Flex.js';
import { GameContext } from '@ui/context/GameContext';
import { NavigationContext } from '@ui/context/NavigationContext';
import { PlayerStats } from './Player/PlayerStats.jsx';
import { useEffect, useState } from 'react';
import type { EntityId } from '@jakeklassen/ecs';
import { ViewList, ViewPanel, type ViewId } from './View/View.js';
import { Views } from './views/index.js';
import { ActionErrors } from './ActionErrors/ActionErrors.js';

export function Game() {
  const [currentView, setCurrentView] = useState<ViewId<typeof Views>>('shop');
  const [viewedMachine, setViewedMachine] = useState<EntityId | null>(null);
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
      <NavigationContext.Provider value={{ viewedMachine, viewMachine }}>
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
                      <Flex pad center key={viewId} theme="invert">
                        {view.name}
                      </Flex>
                    ) : (
                      <Flex
                        pad
                        center
                        key={viewId}
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
