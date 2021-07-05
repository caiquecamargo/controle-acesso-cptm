import { AnimeFloatButton } from "../controllers/AnimeFloatButton";

describe("AnimeFloatButton test suit", () => {
  let animation: AnimeFloatButton;

  beforeEach(() => animation = new AnimeFloatButton(document.createElement("div")));

  it("should return true if is onEnter state", () => {
    animation.onEnter();

    expect(animation.isOnEnter()).toBeTruthy()
    expect(animation.isOnClick()).toBeFalsy()
    expect(animation.isOnLeave()).toBeFalsy()
  })

  it("should return true if is onLeave state", () => {
    animation.onLeave();

    expect(animation.isOnEnter()).toBeFalsy()
    expect(animation.isOnClick()).toBeFalsy()
    expect(animation.isOnLeave()).toBeTruthy()
  })

  it("should return true if is onClick state", () => {
    animation.onClick();

    expect(animation.isOnEnter()).toBeFalsy()
    expect(animation.isOnClick()).toBeTruthy()
    expect(animation.isOnLeave()).toBeFalsy()
  })
})