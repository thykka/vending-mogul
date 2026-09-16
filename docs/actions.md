# Actions design outline

Data:

- ActionIntents
  - move-money:
    - Subtracts Money from Source (if defined)
    - Adds Money to Target (if defined)
  - move-contents:
    - Removes entity from Source Contents (if defined)
    - Adds entity to Target Contents (if defined)

Constructs:

- Cursor
  - `Position`: x, y
  - `held`: bool
  - `pressed`: bool
  - `released`: bool

- Button
  - `Position`: x, y
  - `Size`: w, h
  - `ActionIntent`: ActionIntentId

- ActionEvent
  - `ActionIntent`: ActionIntentId
  - `Target`: entity
  - `Source`: entity

## What happens when player presses a button

- ButtonSystem:
  - Iterate through Buttons:
    - If Cursor Position *collides* with Button Position & Size:
      - If Button is `held` and Cursor is `released`:
        - Read Button ActionIntent and create an ActionEvent
        - Unset Button `held`
      - If Cursor is `pressed`, set Button as `held`
    - Cursor doesn't *collide* with Button:
      - If Button is `held`, unset Button `held`

- ActionSystem:
  - Iterate through ActionEvents:
    - Known ActionIntent is found:
      - Execute action with ActionEvent `Target` & `Source`
    - If there's a problem, spawn an entity with ActionError
  - Remove all Actions

## What kinds of actions do we actually need for each view?

### Global/Player
- Switch View (Contracts / Warehouse / Locations / Machines)

### Contracts
- Signing Contracts:
  - Subtract Player Money
  - Add Delivery into Player ActiveDeliveries?

### Warehouse
- Purchasing Products (via Contract): Create Product into Warehouse ProductSlot
- Purchasing Machines (via Contract): Create Machine into Warehouse MachineSlot
- Tossing Products: Remove Product from Warehouse ProductSlot
- Selling Machines: Remove Machine from Warehouse MachineSlot, Add Player Money

### Location
- Installing Machinges: Move Machine from Warehouse MachineSlot into Location MachineSlot

### Machine
- Stocking Products: Move Product from Warehouse ProductSlot into Machine ProductSlot
- Collecting earnings: Move Machine Change into Player Money
