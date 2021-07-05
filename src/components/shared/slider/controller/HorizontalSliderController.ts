import { HorizontalSlider } from "./HorizontalSlider";

interface HorizontalSliderOptions {
  visibleElements?: number,
}

export class HorizontalSliderController extends HorizontalSlider {
  protected _distance: number;
  protected _width: number;
  protected _visibleElements: number;

  constructor(element: HTMLElement, position: number, length: number, options?: HorizontalSliderOptions) {
    super(element, position, length);
    this._visibleElements = options?.visibleElements || 3;

    this.setParentElementAttributes();
    this._width = this.setElementAttributes();
    this._distance = this._width;
    this.setPosition();
    this.createAnimation();
    this.setVisibility();
  }

  static createElementContainer(element: HTMLElement): HTMLElement {
    const container = document.createElement("span");
    container.style.height = "100%";
    container.style.position = "absolute";
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";

    container.appendChild(element);

    return container;
  }

  protected setElementAttributes(): number {
    const containerWidth = this._element.parentElement?.offsetWidth || 0;
    const width = (containerWidth / this._visibleElements);
    this._element.style.width = `${width}px`;

    return width;
  }

  protected onTerminated() { return };
  protected animeOptions() { return {} };

  protected calcTranslationX(): number[] {
    return [this._from * this._distance, this._to * this._distance];
  }

  protected setVisibility() {
    if (this._from > this._visibleElements) this._element.style.opacity = "0";
  }

  protected setParentElementAttributes() {

  }

  protected createAnimation() {
    if (this._type === "left") {
      switch (this._to) {
        case -1:
          this.leave();
          break;
        case this._visibleElements - 1:
          this.enter();
          break;
        default:
          this.swap();
          break;
      }
    }
    else {
      switch (this._to) {
        case this._visibleElements:
          this.leave();
          break;
        case 0:
          this.enter();
          break;
        default:
          this.swap();
          break;
      }
    }
  };

  protected setPosition() {
    if (this._type === "left") {
      if (this._from === -1) this._from = this._length - 1;
      this._to = this._from - 1;
    }
    else {
      if (this._from === this._length - 1) this._from = -1;
      this._to = this._from + 1;
    }
  }
}