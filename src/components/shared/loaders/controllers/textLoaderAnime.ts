import anime, { AnimeInstance } from "animejs";
import { Anime } from "../../../../controllers/Anime";

export class TextLoaderAnime extends Anime {
  protected _animation: AnimeInstance;

  constructor(element: HTMLElement) {
    super();
    this._animation = this.createAnimation(element);
  }

  static prepareLettersToAnimate(element: HTMLElement): HTMLElement {
    element.innerHTML =
      element.textContent?.replace(/\S/g, "<span>$&</span>") || "";

    return element;
  }

  createAnimation(element: HTMLElement) {
    return anime({
      targets: element.children,
      scale: [2, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: "easeOutCubic",
      duration: 500,
      delay: anime.stagger(200, { start: 500 }),
      autoplay: false,
    });
  }
}
