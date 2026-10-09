# Vending Mogul - Future ideas

Mechanics planned for after the MVP. Not part of the current plan; see `design.md` and `idea-pad.md` for that.

## Contracts

- Contracts allow access to Locations in exchange for Money and/or Rent
- Player has a Portfolio of Contracts
- Signing a Contract subtracts Player Money

## Unlocks/Tech Tree

- Tech tree & research replaces direct unlocking, e.g.: researching Hot Beverage tech unlocks coffee machine, coffee and tea.
- Later mechanics may be used as research point source, e.g.: missions where player has to complete different objectives

## Agents

- Simulated agents move within location visualization, and may stop at the machine to make purchases.
- Wealth becomes an agent's feature too
- Agents have desires for certain products, and dislikes?

## Order delivery methods

- Order delivery methods can change order amounts, delivery time, e.g. Bike courier, Van, Truck, Ship

### Example Orders

- Box of bubblegum (bike) x50
- Box of sandwiches (bike) x20
- Crate of bubblegum (van) x500
- Container of bubblegum (ship) x5000

## Dynamic location stats

- Location stats are static data in the MVP. Other systems may affect them later.

## Unlocking Machines and Products

- MVP only requires unlocking Locations. Machines and Products will need unlocking later

## Sales rate

- MVP uses a fixed sales rate per machine. Later it should be influenced by Location stats, and possibly other systems

## Slot & Machine features

- Products may require or benefit from Slot/Machine features, e.g. hot coffee only sells from heated slots, soda bottles sell for more from refrigerated slots

## Machine management & persistence

- Uninstalling machines back into Storage
- Saving and loading the game

## Known issues

Accepted for the MVP, to fix when the related mechanics are revisited.

- Sales pick a random stocked Slot before checking the money limit, so a Slot whose sale would exceed the limit wastes an interval while another Slot could still sell. Pick only from sellable Slots when random slot selection is replaced (`SalesSystem.sell`)
- Collecting doesn't check that the target is an installed machine or that the collector is the player; any entity with Money works (`CollectSystem`)
