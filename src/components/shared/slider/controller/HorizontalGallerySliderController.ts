import anime from "animejs";
import { HorizontalSlider } from "./HorizontalSlider";

interface HorizontalGallerySliderOptions {
  visibleElements?: number;
  width?: number;
}

export class HorizontalGallerySliderController extends HorizontalSlider {
  protected _distance: number;
  protected _width: number;
  protected _center: number;
  protected _visibleLayer: number;

  constructor(
    element: HTMLElement,
    position: number,
    length: number,
    options?: HorizontalGallerySliderOptions
  ) {
    super(element, position, length);

    if (this._length % 2 === 0)
      throw new ErrorEvent("The number of elements must be odd.");

    this._width = options?.width || 300;
    this.setElementAttributes();

    this._distance = this._width / 2;
    this._center = Math.floor(this._length / 2);

    let visibleElements = options?.visibleElements || this._length;
    this._visibleLayer = Math.floor(visibleElements / 2);
    this.setZ();
    this.setVisibility();
    this.createAnimation();
  }

  protected calcLayer(number: number) {
    const offset = Math.abs(this._center - number);
    return offset;
  }

  protected setZ() {
    const layer = this.calcLayer(this._from);
    const z = 5;
    this._element.style.zIndex = `${z - layer}`;
  }

  protected isVisible(layer: number) {
    return layer <= this._visibleLayer;
  }

  protected setVisibility(): void {
    const fromLayer = this.calcLayer(this._from);
    const opacity = this.isVisible(fromLayer) ? 1 : 0;
    this._element.style.opacity = `${opacity}`;
  }

  protected setElementAttributes(): void {
    this._element.style.position = "absolute";
    this._element.style.width = `${this._width}px`;
    this._element.style.left = `calc(50% - ${this._width / 2}px)`;
  }

  protected onTerminated(): void {
    this.setZ();
  }

  protected createAnimation(): void {
    const toLayer = this.calcLayer(this._to);
    const fromLayer = this.calcLayer(this._from);

    if (!this.isVisible(fromLayer) && this.isVisible(toLayer)) this.enter();
    else if (this.isVisible(fromLayer) && !this.isVisible(toLayer))
      this.leave();
    else this.swap();
  }

  protected setPosition(): void {
    if (this._type === "left")
      this._to = this._from === 0 ? this._length - 1 : this._from - 1;
    else this._to = this._from === this._length - 1 ? 0 : this._from + 1;
  }

  protected calcTranslationX(): number[] {
    return [
      (this._from - this._center) * this._distance,
      (this._to - this._center) * this._distance,
    ];
  }

  protected calcScale() {
    const toLayer = this.calcLayer(this._to);
    const fromLayer = this.calcLayer(this._from);
    return [1 - fromLayer / 10, 1 - toLayer / 10];
  }

  protected animeOptions(): anime.AnimeParams {
    return {
      scale: this.calcScale(),
    };
  }
}
