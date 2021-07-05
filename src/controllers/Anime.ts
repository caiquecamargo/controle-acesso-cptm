import { AnimeInstance } from "animejs";

export enum Direction {
  NORMAL = "normal",
  REVERSE = "reverse",
}

export abstract class Anime {
  protected abstract _animation: AnimeInstance;

  constructor() {}

  protected abstract createAnimation(
    element: HTMLElement | HTMLElement[],
    ...args: unknown[]
  ): AnimeInstance;

  get animation() {
    return this._animation;
  }

  set animation(animation: AnimeInstance) {
    this._animation = animation;
  }

  async animate() {
    this._animation?.play();
    return this._animation?.finished;
  }

  stop() {
    this._animation?.pause();
  }

  reverse() {
    this._animation?.reverse();

    return this;
  }

  setDirection(direction: Direction) {
    this._animation.direction = direction;

    return this;
  }
}
