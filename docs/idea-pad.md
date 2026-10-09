# Vending Mogul - Idea pad

Post-MVP ideas live in `future.md`.

## Player

- Has money they can use to make purchases

## Unlocks/Shop

- Game populates all locations, machines and products at start with a "Locked" component. Unlocking removes this component, enabling purchases/orders.
- Unlocking is a direct purchase
- Player can spend money to order an unlocked machine or product stack. Orders arrive into Player's Storage

## Locations

- Locations have limited slots for machines
- Some locations may charge rent
- Locations have features like traffic and wealth, which change how fast products get sold, if at all
- Locations feature Traffic variance over time? (247, office hours, only daytime, only nighttime, rush hours)

### Example locations

- Gas Station, low traffic, early game location. Only has room for a couple of machines
- Office break room, regular traffic during daytime

### Example location features

- Machine capacity (1-10?)
- Wealth (poor, medium, high, mixed?)
- Traffic (low, medium, high)

## Machines

- Machines have predefined slots for products
  - UI: Each slot has coordinates so we can make grids and weirder layouts
  - UI: A slot can be marked hidden; slot sprite not rendered
- Machines can be sold for 50% of their initial cost
- Machines accumulate money from sales, up to a per-machine money limit. Player can collect it manually
  - Unlockable upgrade: Credit card, NFC payments can automate this?
- UI: Machine frame artwork, contextual animations?

### Example machines

- Bubblegum dispenser, first machine to unlock. Accepts only small, round products.
- Soft drink machine, can sell products which need refrigeration
- Tobacco automat, mid/late game niche machine

## Slots

- A stack of products can be inserted into a slot
- Machines with stocked slots sell single products over time (simulated, later?)
- Slots have features which determine which products can be inserted
- UI: Slots are sprites drawn on top of machine frame.

### Example slot features

- Size (tiny, small, medium, large)
- Shape (ball, box, cylinder, bag...)
- Temperature (cooled, heated)
- Product stack size (1-100?)

## Products

- A stack of products can be ordered from the shop
- Products have a preset retail price & order price
- Products have an order stack size*
- UI: Sprites drawn as icons in menus, or in product slots

### Example products

- Bubblegum (tiny ball): first product to unlock. Only fits bubblegum dispenser. Large stack size.
- Bouncy ball (small ball): Upgrade from bubblegum.
- Jewelry ball (small ball): Better sale price.

- Coffee (small cylinder), requires a heated slot.
- Soft drink (medium cylinder). Cooling optional, can improve sale price?

- Sandwich (medium box), requires cooled slot

### Example product features

- Order price*
- Order stack size*
- Retail price: can be modified by Upgrades?

## Orders

- Order can contain product stacks, or a machine
- Player might unlock orders, which are e.g. more profitable than earlier, similar orders.
- Order might take some time to get delivered
