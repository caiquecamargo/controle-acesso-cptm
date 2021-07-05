import anime, { AnimeInstance } from "animejs";
import { Anime } from "../../../../controllers/Anime";

export class PageLoaderAnime extends Anime {
  protected _animation: AnimeInstance;

  constructor(element: HTMLElement) {
    super();
    this._animation = this.createAnimation(element);
  }

  createAnimation(element: HTMLElement) {
    return anime
      .timeline({
        targets: element,
        autoplay: false,
        loop: true,
        duration: 500,
      })
      .add({
        easing: "easeOutSine",
        translateX: [-50, 50],
        scaleX: [
          { value: 2, duration: 150, easing: "easeOutExpo" },
          { value: 1, duration: 350, easing: "easeOutExpo" },
        ],
      })
      .add({
        easing: "easeOutSine",
        translateX: [50, -50],
        scaleX: [
          { value: 2, duration: 150, easing: "easeOutExpo" },
          { value: 1, duration: 350, easing: "easeOutExpo" },
        ],
      });
  }
}
