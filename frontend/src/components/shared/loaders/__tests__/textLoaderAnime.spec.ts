import { createElementMock } from "../../../../__mocks__/element.mock";
import { TextLoaderAnime } from "../controllers/textLoaderAnime";

describe("PageLoaderAnime suit test", () => {
  it("should create an animation when the class is instaciated.", () => {
    const element = createElementMock();
    const loaderAnimation = new TextLoaderAnime(element);

    expect(loaderAnimation.animation).toBeDefined();
  });

  it("should return an empty element if the passed element is empty", () => {
    const text = "";
    const expected = "";

    const received = TextLoaderAnime.prepareLettersToAnimate(
      createElementMock(text)
    );

    expect(received.innerHTML).toBe(expected);
  });

  it("given an text returns this text in spans.", () => {
    const text = "TEST";
    const expected = "<span>T</span><span>E</span><span>S</span><span>T</span>";

    const received = TextLoaderAnime.prepareLettersToAnimate(
      createElementMock(text)
    );

    expect(received.innerHTML).toBe(expected);
  });
});
