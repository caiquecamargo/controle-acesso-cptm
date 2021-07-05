import anime from "animejs";
import { Direction } from "../../controllers/Anime";
import { AnimeMock } from "../__mocks__/Anime.mock";

describe("Anime suit test", () => {
  let animeMock: AnimeMock;
  const div = document.createElement("div");

  beforeEach(() => {
    animeMock = new AnimeMock(div);
  });

  it("should return an animation", () => {
    const animation = anime({
      targets: document.createElement("div"),
      opacity: [1, 0],
      duration: 1000,
      easing: "easeOutExpo",
      delay: (el, i) => 70 * i,
    });

    animeMock.animation = animation;

    expect(animeMock.animation).toBe(animation);
  });

  it("should call animation.play when animate", () => {
    const animation = animeMock.animation;
    const animationSpy = jest.spyOn(animation, "play");

    animeMock.animate();

    expect(animationSpy).toBeCalled();
  });

  it("should call animation.pause when stop", () => {
    const animation = animeMock.animation;
    const animationSpy = jest.spyOn(animation, "pause");

    animeMock.stop();

    expect(animationSpy).toBeCalled();
  });

  it("should call animation.reverse when reverse", () => {
    const animation = animeMock.animation;
    const animationSpy = jest.spyOn(animation, "reverse");

    animeMock.reverse();

    expect(animationSpy).toBeCalled();
  });

  it("should set the direction of the animation with the setDirection", () => {
    let direction = Direction.NORMAL;
    animeMock.setDirection(direction);

    expect(animeMock.animation.direction).toBe(direction);

    direction = Direction.REVERSE;
    animeMock.setDirection(direction);

    expect(animeMock.animation.direction).toBe(direction);
  });
});
