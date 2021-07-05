import anime, { AnimeInstance } from "animejs";
import { Anime } from "../../../../controllers/Anime";

export class AnimeSandwich extends Anime {
  protected _animation: anime.AnimeInstance | anime.AnimeTimelineInstance;

  constructor(element: HTMLElement) {
    super();
    this._animation = this.createAnimation(element);
  }
  protected createAnimation(element: HTMLElement): AnimeInstance {
    return anime.timeline({
      targets: element.children,
      autoplay: false,
      easing: 'easeOutSine',
      duration: 250,
    })
      .add({
        opacity: (el: HTMLElement, index: number) => {
          if (index === 1) return [1, 0];
        },
        translateY: (el: HTMLElement, index: number) => {
          const qty = 8;
          if (index === 1) return 0;
          return index ? -qty : qty;
        },
      })
      .add({
        rotateZ: (el: HTMLElement, index: number) => {
          const qty = 45;
          if (index === 1) return 0;
          return index ? -qty : qty;
        }
      })
  }

}