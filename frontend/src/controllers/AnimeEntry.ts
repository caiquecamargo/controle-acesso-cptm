import anime, { AnimeInstance, AnimeParams } from "animejs";
import { Anime } from "./Anime";

export type EntryAnimationType =
  | "from-left"
  | "from-right"
  | "from-top"
  | "from-bottom"
  | "surge";

export class AnimeEntry extends Anime {
  protected _animation: anime.AnimeInstance | anime.AnimeTimelineInstance;

  constructor(
    element: HTMLElement,
    type: EntryAnimationType,
    params?: AnimeParams
  ) {
    super();
    this._animation = this.createAnimation(element, type, params);
  }

  protected createAnimation(
    element: HTMLElement,
    type: EntryAnimationType,
    params?: AnimeParams
  ): AnimeInstance {
    const defaultParams: AnimeParams = {
      targets: element,
      opacity: [0, 1],
      autoplay: false,
      duration: 250,
      easing: "easeOutQuad",
      ...params,
    };

    const types: Record<EntryAnimationType, AnimeParams> = {
      "from-right": { ...defaultParams, translateX: [50, 0] },
      "from-left": { ...defaultParams, translateX: [-50, 0] },
      "from-top": { ...defaultParams, translateY: [-50, 0] },
      "from-bottom": { ...defaultParams, translateY: [50, 0] },
      surge: { ...defaultParams, opacity: [0, 1] },
    };

    return anime(types[type]);
  }
}
