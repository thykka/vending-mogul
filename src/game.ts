import { spawnGame } from '@factories/Game-factory';

export const game = spawnGame();

export type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribeToGame(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function notifyListeners() {
  listeners.forEach((listener) => listener());
}

let lastTick: number;
let rafId: number | null = null;

function tick() {
  const now = performance.now();
  const dt = now - lastTick;
  lastTick = now;
  game.update(dt);
  notifyListeners();
  rafId = requestAnimationFrame(tick);
}

export function startLoop() {
  if (rafId !== null) return;
  lastTick = performance.now();
  rafId = requestAnimationFrame(tick);
}

export function stopLoop() {
  if (rafId === null) return;
  cancelAnimationFrame(rafId);
  rafId = null;
}
