# Layout

Working sketch of views and the data they show. Not prescriptive; superseded by UI code in `src/ui/components/views/` as views get built.


- UI (grid-v)
  - Header (grid-h)
    - Time/calendar
    - Resources (list)
      - Money
    - Menu (button)
  - View area (grid-v, scrolling-v)
    - View contents
  - View list (grid-h, scrolling-v)
    - View selector (button)

## Views

### Shop

- Shop Tab[]
  - Tab: Locations
    - Title
    - Description
    - Shop Location[]
      - Icon
      - Title
      - Description
      - [locked]
        - UnlockOrder Price
        - UnlockOrder Button
  - Tab: Machines
    - Title
    - Description
    - Shop Machine[]
      - Icon
      - Title
      - Description
      - [locked]
        - UnlockOrder Price
        - UnlockOrder Button
      - [not locked and can afford]
        - MachineOrder Price
        - MachineOrder Button
  - Tab: Products
    - Title
    - Description
    - Shop Product[]
      - Icon
      - Title
      - Description
      - [locked]
        - UnlockOrder Price
        - UnlockOrder Button
      - [not locked and can afford]
        - ProductOrder Price
        - ProductOrder Amount
        - ProductOrder Button
  - Tab: Upgrades
    - Title
    - Description
    - Shop Upgrade[]
      - Icon
      - Title
      - Description
      - [locked]
        - UnlockOrder Price
        - UnlockOrder Button
      - [not locked and can afford]
        - UpgradeOrder Price
        - UpgradeOrder Button

### Orders

- List Order[]
  - Icon
  - Title
  - OrderProgress

### Storage

- Storage Tab[]
  - Tab: Machines
    - Title
    - Description
    - Storage MachineSlot[]
      - Icon
      - Title
      - [empty]
        - ViewShopMachines Button
      - [not empty]
        - InstallOrder Button // TODO: Choose Location & Slot
        - SellMachine Button
  - Tab: Products
    - Title
    - Description
    - Storage ProductSlot[]
      - Icon
      - Title
      - [empty]
        - ViewShopProducts Button
      - [not empty]
        - StockProduct Button // TODO: Choose Machine & Slot
        - DisposeOrder Button

### Map

- Map Location[]
  - Icon
  - Title
  - Stats
  - Location MachineSlot[]
    - Icon
    - Title
    - [empty]
      - InstallOrder Button // TODO: Choose Machine
    - [not empty]
      - ViewMachine Button
      - UninstallOrder Button

### Machine

- Icon
- Title
- Money / Money limit
- Collect Button
- Machine ProductSlot[]
  - Icon
  - Title
  - Amount/Max
  - [empty]
    - StockOrder Button // TODO: Choose Product
  - [not empty]
    - StockOrder Button
    - DisposeOrder Button
