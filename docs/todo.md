# TODO

## MVP review fixes

### Logic

- [x] Guard unlocks in systems: buying an already unlocked Location must not charge the buyer. Add a test (`MoneySystem` / `UnlockSystem`). A purchase of an already unlocked target is refunded, which also covers two purchases in the same update
- [x] `MoneySystem` `noEntity` error reports the buyer instead of the action

### Duplication

- [x] Action factories: add a generic `spawnAction(world, ...components)`; keep the named `spawn*Action` helpers as one-line wrappers around it (`factories/Action-factory.ts`, `factories/Order-factory.ts`)
- [ ] Map view: use `installedMachines` from `shared/queries.ts` instead of its own filter
- [ ] `PlayerStats`: find the player with `useGameView(Player, Name, Money)` instead of relying on `Name` + `Money`
- [x] `globalThis.player`: keep as a debugging helper, add a comment saying so (`factories/Game-factory.ts`)
- [x] `BuyAction`: carry the `cost` directly instead of a `buyable` entity; remove `MoneySystem.getCost` and `OrderPrice`. Locations keep `UnlockPrice` for display; the purchase factory copies it into the action
- [x] `loadOrderData`: keep it (`loadData` can't type a generic order source), add a comment explaining why it exists
- [x] Add a shared `canStock(product, slot)` to `shared/queries.ts`; use it in `StockSystem` and `MachineSlot`

### Legibility

- [x] Rename the `DataId` type in `data/registry.ts` so it doesn't clash with the `DataId` component
- [x] Rename the product's sale `Price` component to `SalePrice`
- [ ] Rename `views/Locations.tsx` / `LocationsView` to `views/Map.tsx` / `MapView`; keep `views/Shop/Locations.tsx`
- [x] Remove the dead `locked: true` default in `factories/Location-factory.ts`
- [x] Remove the redundant `source in DataRegistry` checks in `allData` / `allIds`
- [x] Remove the `MoneySystem.showError` wrapper; call `spawnActionError` directly like other systems
- [x] Comment the `SalesSystem.update` loop: a sale that leaves nothing sellable resets the interval

### Consistency

- [ ] Use path aliases without file extensions in `game.ts`, `app.tsx`, `index.tsx` and `ui/components/Game.tsx`
- [ ] Lint `.tsx` files too (`lint` script in `package.json`)
- [x] Rename `components/timer.ts` to `components/Timer.ts` (it's used by Orders, ActionErrors and `TimerSystem`)
- [x] Use `EntityId` instead of `number` for entity parameters and return values in factories
- [ ] Display all money values with `formatCurrency` (e.g. `PlayerStats`)
- [ ] `Game.tsx`: remove the extra `key` props on the inner `Flex`es; remove the commented-out `modifyComponent` in `useGameMutate.ts`

## Later

- `SalesSystem.sell` picks a random stocked slot before checking the money limit, so a slot that can't sell wastes an interval while another could sell. Pick only from sellable slots when random slot selection is replaced
- `CollectSystem` doesn't check that `machine` is an installed machine or that `collector` is the player; any entity with `Money` works
