# TODO

## Post-MVP foundation

### Persistence

- [ ] Save and load game state. Decide what gets saved: entities and their components, or a smaller game-state model that the world is rebuilt from
- [ ] Entity references survive a save/load round trip: `Parent`, `Children`, `Contents.item` and any pending `Order`s point to the same entities after loading. Either keep entity ids stable, or remap them on load
- [ ] Save format carries a version number, so older saves can be migrated once components change
- [ ] Autosave (interval and/or `visibilitychange`), and load on startup
- [ ] Offline progress: on load, advance the world by the time elapsed since the save. Cap it, and check that `SalesSystem` and `TimerSystem` handle one very large `dt`
- [ ] Test: save → load → save produces identical output

### Purchases

- [ ] Validate before charging instead of charging and refunding. Each system that owns an action checks it can go through first, then charges. Remove `UnlockSystem.refund` (`MoneySystem`, `UnlockSystem`, `OrderSystem`)
- [ ] Keep the two-purchases-in-one-update case covered: the second unlock of the same Location fails without charging

### Integration test

- [ ] Run the full loop through `spawnGame()` and `world.update(dt)`: order machine → delivery → install → order products → stock → sell → collect. This protects the system order in `Game-factory.ts`, which no unit test covers

### UI performance

- [ ] Stop re-rendering the whole UI every frame. Notify UI listeners at a lower rate (e.g. 5–10 Hz) than the game loop runs (`game.ts`)
- [ ] `useGameView`: keep `subscribe` stable across renders (`useCallback` or module scope), so `useSyncExternalStore` doesn't resubscribe every render
- [ ] `useGameView`: only produce a new snapshot when the viewed data changed, so the cache actually prevents re-renders
- [ ] `MachineView`: replace `useGameView(MachineDataId)` used only to force re-renders

### Data validation

- [ ] Test that every id referenced in the data files exists: machine orders → machines, product orders → products, machines → slots, products → sprites. Catches typos at `npm run check` instead of when an order arrives
- [ ] Then consider dropping the `as MachineId` / `as ProductId` / `as SlotId` casts where the test makes them safe (`DeliverySystem`, `Machine-factory`, `Product-factory`)

### Cleanup

- [ ] Remove the unused `useGameMutate` hook. The UI changes game state only through the `spawn*` action factories

### Tooling

- [ ] Update Node in `.nvmrc` (Node 20 is past end of life)
- [ ] Migrate ESLint 8 → 9/10 with a flat config (`eslint.config.js`): move `.eslintignore` into `ignores`, drop `--ext` from the `lint` script
