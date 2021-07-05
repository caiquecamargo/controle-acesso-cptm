import { createElementMock } from "../../../../__mocks__/element.mock";
import { HorizontalSliderController } from "../controller/HorizontalSliderController";

describe("HorizontalSliderController suit test", () => {
  it("should create an element container.", () => {
    const element = createElementMock();

    const received = HorizontalSliderController.createElementContainer(element);
    const expected =
      '<span style="height: 100%; position: absolute; display: flex; justify-content: center; align-items: center;"><div></div></span>';

    expect(received.outerHTML).toBe(expected);
  });

  it("should call turn.", async () => {
    const horizontalSliderController = new HorizontalSliderController(
      createElementMock(),
      0,
      1
    );

    expect(horizontalSliderController["_from"]).toBe(0);

    await horizontalSliderController.turn("left");

    expect(horizontalSliderController["_from"]).toBe(-1);
  });
});
