import { System, type World } from '@jakeklassen/ecs';
import { Sprite } from '@components/Sprite';
import { Position } from '@components/Position';

import { allData } from '@data/registry';

const Sprites = allData('sprites');

export class SpriteRenderer extends System {
  #ctx: CanvasRenderingContext2D;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly spriteSheet: HTMLImageElement,
    public tileSize = 16
  ) {
    super();
    this.#ctx = this.canvas.getContext('2d')!;
    this.#ctx.imageSmoothingEnabled = false;
  }

  public update(world: World, dt: number) {
    for (const [entity, components] of world.view(Sprite, Position)) {
      this.drawSprite(components.get(Sprite), components.get(Position));
    }
  }

  drawSprite(sprite: Sprite, position: Position): void {
    this.#ctx.drawImage(
      this.spriteSheet,
      sprite.sx * this.tileSize,
      sprite.sy * this.tileSize,
      sprite.sw * this.tileSize,
      sprite.sh * this.tileSize,
      position.x,
      position.y,
      sprite.sw * this.tileSize,
      sprite.sh * this.tileSize
    );
  }
}
