# Vend

## Outline

Simulation Idle Management game

### Player

- Player represents the user's assets in the game world
- Player has an Account of Money
- Player has a Storage of Machines and Products
- Player has Upgrades, which may alter properties in a global fashion
  - Internally these are Modifiers: most are positive, but some may have negative effects. Player-facing name is Upgrades

### Locations

- Locations are spots into which Player can Deploy a Machine
- Locations have predefined stats (some hidden from UI?)

  - Traffic: How often does someone walk by the machine
  - Rent: How much Money does this Location cost per ?? (TODO: time units?)
  - Wealth: How much Money do people spend at this Location compared to others
  - Competition: Rival vending machines may eat into profits, if they provide similar Products

- Location stats come from static data (see `future.md` for dynamic stats)
- Unlocking locations is the primary method of progression
- Locations are unlocked by direct purchase (see `future.md` for Contracts)
- Late-game location stats are improved by orders of magnitude

#### (Vending) Machines

- Machines are Ordered, and arrive into Player's Storage
- Machines can be sold for 50% of their initial cost
- Machines have different amounts of Slots
- Machines accumulate Money from sales, up to a per-machine Money limit
- Player collects Money from a Machine manually

##### Slots

- Products are Placed into and Sold from Slots
- Each Slot can contain a Product
