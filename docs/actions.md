# Actions design outline

Actions are short-lived entities. The UI spawns them, systems process them during the next update, and `ActionSystem` deletes them at the end of the update.

Components:

- `Action`: marks an entity as an action
- `BuyAction`: `buyer`, `buyable` entities. Charges `buyable`'s UnlockPrice or OrderPrice from `buyer` Money
- `UnlockAction`: `target` entity. Removes `Locked` from `target`
- `Paid`: added to an action once its BuyAction has been paid for
- `ActionError`: spawned as its own entity when an action fails

Factories (`factories/Action-factory.ts`) combine these, e.g. `spawnUnlockPurchase` creates an action with both `BuyAction` and `UnlockAction`.

## What happens when player presses a button

- React UI button calls an action factory, e.g. `spawnUnlockPurchase(game, player, location)`
- Systems run in order:
  - MoneySystem: for each BuyAction, charge buyer and add `Paid`, or spawn an ActionError
  - UnlockSystem: for each UnlockAction, remove `Locked` from target. If the action has a BuyAction, only proceed if `Paid`
  - ActionSystem: delete all Action entities

## What kinds of actions do we actually need for each view?

### Global/Player

- Switch View (Shop / Orders / Storage / Map / Machine)

### Shop

- Unlocking Locations, Machines, Products: Subtract Player Money, remove `Locked`
- Ordering Machines and Products: Subtract Player Money, create an Order

### Orders

- Delivering Orders: Create Machine or Product into Storage

### Storage

- Tossing Products: Remove Product from Storage
- Selling Machines: Remove Machine from Storage, Add 50% of its initial cost to Player Money

### Map

- Installing Machines: Move Machine from Storage into Location MachineSlot

### Machine

- Stocking Products: Move Product from Storage into Machine ProductSlot
- Collecting earnings: Move Machine Change into Player Money
