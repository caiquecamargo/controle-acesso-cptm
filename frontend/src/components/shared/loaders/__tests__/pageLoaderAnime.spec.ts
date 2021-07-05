import anime from "animejs";
import { createElementMock } from "../../../../__mocks__/element.mock";
import { PageLoaderAnime } from "../controllers/pageLoaderAnime";

describe("PageLoaderAnime suit test", () => {
  it("should create a timeline animation when the class is instaciated.", () => {
    const animeSpy = jest.spyOn(anime, "timeline");

    new PageLoaderAnime(createElementMock());

    expect(animeSpy).toHaveBeenCalled();
  });
});
