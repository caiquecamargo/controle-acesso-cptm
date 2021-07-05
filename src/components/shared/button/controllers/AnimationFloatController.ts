import { isMobile } from "../../../../helpers/utils";
import { AnimationController } from "../../../../controllers/AnimationController";
import { AnimeFloatButton } from "./AnimeFloatButton";

export class AnimationFloatController extends AnimationController<AnimeFloatButton> {

  constructor() {
    super();
  }

  private remaining() { return this.animation?.animation?.remaining !== 0 }
  private isOnCLick() { return this.animation?.isOnClick() && this.remaining() }
  private play() { this.animation?.animate() }

  async onMouseEnter() {
    if (isMobile()) return;

    if (this.isOnCLick())
      await this.finished;

    this.animation?.onEnter();

    this.play();
  }

  onMouseLeave = async () => {
    if (isMobile()) return;

    if (this.isOnCLick())
      await this.finished;

    this.animation?.stop();
    this.animation?.onLeave();

    this.animation?.animate();
  };

  onClick = () => {
    this.animation?.stop();
    this.animation?.onClick();

    this.reverseState();
    this.play();
  };
}