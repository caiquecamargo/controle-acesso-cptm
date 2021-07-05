import anime, { AnimeInstance } from "animejs";
import { Anime } from "../../../../controllers/Anime";

export class AnimeMenu extends Anime {
  protected _animation: anime.AnimeInstance | anime.AnimeTimelineInstance;

  constructor(element: HTMLElement) {
    super();
    this._animation = this.createAnimation(element);
  }

  protected createAnimation(element: HTMLElement): AnimeInstance {
    return anime
      .timeline({
        easing: "easeInOutSine",
        autoplay: false,
      })
      .add({
        targets: element,
        opacity: [0, 1],
        translateX: ["-100vw", 0],
        duration: 150,
      })
      .add({
        targets: element.children,
        opacity: [0, 1],
        duration: 100,
        translateX: ["-100vw", 0],
        scale: [2, 1],
        delay: anime.stagger(50),
      });
  }
}
