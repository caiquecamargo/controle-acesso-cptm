import { createElementMock } from "../../../../__mocks__/element.mock";
import { HorizontalGallerySliderController } from "../controller/HorizontalGallerySliderController";

describe("HorizontalGallerySliderController suit test", () => {
  it("should call turn.", async () => {
    const horizontalGallerySliderController =
      new HorizontalGallerySliderController(createElementMock(), 0, 3);

    expect(horizontalGallerySliderController["_from"]).toBe(0);

    await horizontalGallerySliderController.turn("left");

    expect(horizontalGallerySliderController["_from"]).toBe(2);
  });

  it("should throws an error if array is even.", async () => {
    let err;

    try {
      new HorizontalGallerySliderController(createElementMock(), 0, 2);
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
  });
});
