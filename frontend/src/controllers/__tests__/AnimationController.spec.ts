import { AnimationController } from "../../controllers/AnimationController";
import { AnimeMock } from "../__mocks__/Anime.mock";

describe("AnimationState test suit", () => {
  let animationController: AnimationController<AnimeMock>;

  beforeEach(() => {
    animationController = new AnimationController();
  });

  it("should animate and define a property state when open and close", async () => {
    const element = document.createElement("div");
    animationController.animation = new AnimeMock(element);
    const animationSpy = jest.spyOn(animationController.animation, "animate");

    expect(animationController.isClosed()).toBeTruthy();

    await animationController.open();

    expect(animationController.isOpened()).toBeTruthy();

    await animationController.open();

    expect(animationController.isOpened()).toBeTruthy();
    expect(animationSpy).toHaveBeenCalledTimes(1);

    await animationController.close();

    expect(animationController.isClosed()).toBeTruthy();

    await animationController.close();

    expect(animationController.isClosed()).toBeTruthy();
    expect(animationSpy).toHaveBeenCalledTimes(2);

    await animationController.swap();

    expect(animationController.isOpened()).toBeTruthy();
    expect(animationSpy).toHaveBeenCalledTimes(3);

    await animationController.swap();

    expect(animationController.isClosed()).toBeTruthy();
    expect(animationSpy).toHaveBeenCalled();
    expect(animationSpy).toHaveBeenCalledTimes(4);
    expect(animationController.finished).toBe(
      animationController.animation.animation.finished
    );
  });
});
