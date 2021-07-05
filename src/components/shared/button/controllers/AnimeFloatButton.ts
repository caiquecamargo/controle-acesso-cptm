import anime, { AnimeInstance } from "animejs";
import { Anime } from "../../../../controllers/Anime";

export enum AnimeFloatButtonState {
  ON_ENTER,
  ON_LEAVE,
  ON_CLICK,
  SELF,
}

export class AnimeFloatButton extends Anime {
  protected _animation: anime.AnimeInstance | anime.AnimeTimelineInstance;
  private _element: HTMLElement
  state: AnimeFloatButtonState = AnimeFloatButtonState.SELF;

  constructor(element: HTMLElement) {
    super();
    this._element = element;
    this._animation = this.createAnimation(element);
  }

  isOnEnter(): boolean {
    return this.state === AnimeFloatButtonState.ON_ENTER;
  }

  isOnLeave(): boolean {
    return this.state === AnimeFloatButtonState.ON_LEAVE;
  }

  isOnClick(): boolean {
    return this.state === AnimeFloatButtonState.ON_CLICK;
  }

  protected createAnimation(element: HTMLElement): AnimeInstance {
    return anime.timeline({
      targets: element,
      autoplay: false,
    }).add({
      opacity: [0, 1],
      top: ["70%", "30%"],
      scaleX: [
        { value: 1.5, duration: 100, delay: 100, easing: 'easeOutExpo' },
        { value: 1, duration: 300, easing: 'easeOutExpo' },
      ],
      scaleY: [
        { value: 0.2, duration: 100, delay: 100, easing: 'easeOutExpo' },
        { value: 1, duration: 300, easing: 'easeOutExpo' },
      ],
      duration: 1000,
    }).add({
      easing: "easeOutQuart",
      duration: 2000,
      rotateY: ["2880deg"],
    }).add({
      right: [
        { value: "5%", duration: 2000 },
      ],
      scaleX: [
        { value: 2, duration: 200, easing: 'easeOutExpo' },
        { value: 1, duration: 500, easing: 'easeOutExpo' },
        { value: 0.6, duration: 200, easing: 'easeOutExpo' },
        { value: 1, duration: 1000, easing: 'easeOutExpo' },
      ],
      scaleY: [
        { value: 0.5, duration: 200, easing: 'easeOutExpo' },
        { value: 1, duration: 500, easing: 'easeOutExpo' },
        { value: 1.2, duration: 200, easing: 'easeOutExpo' },
        { value: 1, duration: 1000, easing: 'easeOutExpo' },
      ],
    })
  }

  onEnter(): void {
    this.animation = anime({
      targets: this._element,
      autoplay: false,
      loop: true,
      duration: 500,
      direction: "alternate",
      easing: "easeInOutSine",
      rotate: ["45deg", "-45deg"]
    })

    this.state = AnimeFloatButtonState.ON_ENTER;
  }

  onLeave(): void {
    this.animation = anime({
      targets: this._element,
      autoplay: false,
      duration: 150,
      easing: "easeInOutSine",
      rotate: "0deg"
    })

    this.state = AnimeFloatButtonState.ON_LEAVE;
  }

  onClick(): void {
    this.animation = anime({
      targets: this._element,
      autoplay: false,
      scaleX: [
        { value: 1.5, duration: 250, easing: 'easeOutExpo' },
        { value: 1, duration: 250, easing: 'easeOutExpo' },
      ],
      scaleY: [
        { value: 0, duration: 250, easing: 'easeOutExpo' },
        { value: 1, duration: 250, easing: 'easeOutExpo' },
      ],
    })

    this.state = AnimeFloatButtonState.ON_CLICK;
  }
}