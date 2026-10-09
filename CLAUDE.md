# Overview

A browser idle/simulation game prototype in TypeScript.

# Architecture

Game state uses `@jakeklassen/ecs` ECS library. `components/`, `systems/`, `factories/` and `data/` are the relevant directories.

Game UI uses React for UI, hooked to state via `ui/hooks/useGameView.ts` and `ui/hooks/useGameMutate.ts`.

# Rules

- GitHub access is restricted. Always prompt user to handle tasks like pushing or pulling.
- Project is in an exploratory phase; prefer simple and flexible solutions over rigid and complex ones.
- Always ask user before adding new dependencies.
- Don't guess, prove your assumptions. For game design decisions, ask user for their preference.

# Usage

- Use `.nvmrc` for correct Node.js version
- Use `npm run check` to check types, run linter and unit tests

# Conventions

- Unit tests sit next to code as `*.test.ts`
- Import from other directories via path aliases (`@components/*`, `@systems/*`, `@factories/*`, `@data/*`, `@shared/*`, `@ui/*`, `@/*` for `src/`); same-directory imports stay relative. Aliases are defined in both `tsconfig.json` and `jest.config.js`
- Use scoped commits; `<scope>: <description> [optional body]`, for example `UI: add Flex pad property`
