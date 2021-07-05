import { mockWindowVisualViewport } from "../../__mocks__/window.mock";
import { optimizedResizeEvent } from "../optimizedResizeEvent";

describe("OptmizedResizeEvent suit test", () => {
  it("should throws an callback if the resizeEvent is throw.", async () => {
    const obj = {
      fn: () => {},
      fntwo: () => {},
    };

    const fnSpy = jest.spyOn(obj, "fn");
    mockWindowVisualViewport();

    optimizedResizeEvent.add(obj.fn);
    optimizedResizeEvent.add(obj.fntwo);
    optimizedResizeEvent["resize"]();
    optimizedResizeEvent["resize"]();

    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    await sleep(1000);
    expect(fnSpy).toHaveBeenCalled();
  });
});
