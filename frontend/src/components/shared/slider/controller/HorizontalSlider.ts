import anime, { AnimeInstance, AnimeParams } from "animejs";

export type SliderType = "left" | "right";

export abstract class HorizontalSlider {
  protected _animation: AnimeInstance | undefined;
  protected _type: SliderType = "left";
  protected _from: number;
  protected _to: number;
  protected abstract _distance: number;
  protected abstract _width: number;

  constructor(
    protected _element: HTMLElement,
    protected _position: number,
    protected _length: number
  ) {
    this._from = this._position;
    this._to = this._position;
  }

  protected abstract setVisibility(): void;
  protected abstract setElementAttributes(): void | number;
  protected abstract onTerminated(): void;
  protected abstract createAnimation(): void;
  protected abstract setPosition(): void;
  protected abstract calcTranslationX(): number[];
  protected abstract animeOptions(): AnimeParams;

  async turn(type: SliderType) {
    this._type = type;
    this.setPosition();
    this.createAnimation();
    await this.animate();
    this._from = this._to;
    this.onTerminated();
  }

  protected animate() {
    this._animation?.play();
    return this._animation?.finished;
  }

  protected swap() {
    this._animation = anime({
      targets: this._element,
      autoplay: false,
      translateX: this.calcTranslationX(),
      duration: 200,
      easing: "linear",
      ...this.animeOptions(),
    });
  }

  protected enter() {
    this._animation = anime({
      targets: this._element,
      autoplay: false,
      opacity: [0, 1],
      translateX: this.calcTranslationX(),
      duration: 200,
      easing: "linear",
      ...this.animeOptions(),
    });
  }

  protected leave() {
    this._animation = anime({
      targets: this._element,
      autoplay: false,
      opacity: [1, 0],
      translateX: this.calcTranslationX(),
      duration: 200,
      easing: "linear",
      ...this.animeOptions(),
    });
  }
}
