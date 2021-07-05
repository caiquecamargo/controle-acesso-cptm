import anime, { AnimeInstance } from "animejs";
import { Anime } from "../../controllers/Anime";

export class AnimeMock extends Anime {
  protected _animation: anime.AnimeInstance | anime.AnimeTimelineInstance;

  constructor(element: HTMLElement) {
    super();
    this._animation = this.createAnimation(element);
  }

  protected createAnimation(element: HTMLElement): AnimeInstance {
    return anime({
      targets: element,
      opacity: [1, 0],
      duration: 1000,
      easing: "easeOutExpo",
      delay: (el, i) => 70 * i,
    });
  }
}
