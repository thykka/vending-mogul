# MVP plan

Minimal playable loop: order machine → deliver to Storage → install at Location → order products → stock machine → sell over time → collect money → reinvest.

## Decisions

- Orders take time to arrive. Price, delivery time (seconds) and contents come from data. Product and machine orders are kept in separate files; bundled orders are not planned.
  - `productOrders.json`: an order may contain several products, each with an amount
  - `machineOrders.json`: an order always contains exactly one machine

  ```json
  "bubblegumbox": {
    "price": 25,
    "deliveryTime": 5,
    "products": [{ "product": "bubblegum", "amount": 50 }]
  }
  ```

  ```json
  "gumball-single": { "price": 75, "deliveryTime": 30, "machine": "gumball-single" }
  ```

- Only Locations need unlocking. Machines and Products are orderable from the start
- Sales rate is fixed per machine (`salesInterval` in `machines.json`, seconds). Each interval the machine sells one item from a randomly picked stocked slot
- Machines hold Money up to `moneyLimit` (`machines.json`). A sale that would exceed the limit doesn't happen, so a full machine stops selling until collected
- Products must exactly match Slot shape and dimensions
- Storage holds one pool per product; deliveries merge into it. Stocking moves items from the pool into a Slot, up to the Slot's capacity
- Machine view shows the last machine opened from the Map; the Machine tab is disabled until then
- A Slot only accepts more of the product it already holds
- Not in MVP: rent, selling machines, tossing products, uninstalling machines, save/load, upgrades

## Steps

1. ✅ Groundwork: fix and register TimerSystem, show ActionErrors in UI, remove Warehouse leftovers
2. ✅ Orders data & Shop: list machine/product orders in Shop Machines/Products tabs; ordering creates an Order with a Timer
3. ✅ Delivery & Orders view: completed Orders spawn machines/products into Storage; show progress
4. ✅ Storage view: list owned machines and products
5. ✅ Installing: Map view lists unlocked Locations and machine slots; install from Storage
6. ✅ Stocking: Machine view stocks products into a matching Slot, up to its capacity
7. ✅ Sales: sell from stocked slots at a fixed rate, accumulate Money up to the limit
8. Collecting: Collect button in Machine view
