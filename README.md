# Vending Mogul

It's a 2D idle/simulation game about vending machines. Player orders products, stocks their machines, and waits for profits.
Player can use money to unlock and buy new vending machines, products and upgrades.

> [!NOTE]
> Currently, this is a hobby project in exploration phase, so the code & repo is messy relative to my professional standards :P

Check the [idea pad](./docs/idea-pad.md) for more information.

## Technology

Vending Mogul is a browser game written in TypeScript, being developed using an Entity-Component-System architecture and a loose adherence to data-driven programming.

We use [@jakeklassen/ecs](https://github.com/jakeklassen/ecs) library, and react for UI. [Jest](https://jestjs.io/) is used for tests.

## Usage

You'll need Node.js v20. With [nvm](https://github.com/nvm-sh/nvm), run `nvm install` within the cloned repo directory.

Install dependencies with `npm i`

Start the development server with `npm start`, then point your browser at https://localhost:1234/
