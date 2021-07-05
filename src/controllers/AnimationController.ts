import { ref } from "@vue/reactivity";
import { Anime, Direction } from "./Anime";

export enum AnimationState {
  OPENED,
  CLOSED,
}

export class AnimationController<T extends Anime> {
  protected _animation: T | undefined;
  protected _state = ref<AnimationState>(AnimationState.CLOSED);

  constructor() { }

  get state() { return this._state.value; }
  get animation() { return this._animation; }
  get finished() { return this._animation?.animation.finished }
  set animation(animation: T | undefined) { this._animation = animation }

  protected reverseState() {
    this._state.value = this._state.value === AnimationState.OPENED ? AnimationState.CLOSED : AnimationState.OPENED;
  }

  isOpened() { return this._state.value === AnimationState.OPENED }
  isClosed() { return this._state.value === AnimationState.CLOSED }

  protected async animate() {
    return new Promise<void>(async (resolve) => {
      await this._animation?.animate();
      this._animation?.reverse();

      resolve();
    })

  }

  open() {
    if (this.isClosed()) {
      this._state.value = AnimationState.OPENED;
      this._animation?.setDirection(Direction.NORMAL);
      return this.animate();
    }
  }

  close() {
    if (this.isOpened()) {
      this._state.value = AnimationState.CLOSED;
      this._animation?.setDirection(Direction.REVERSE);
      return this.animate();
    }
  }

  swap() {
    this.reverseState();
    return this.animate();
  }
}