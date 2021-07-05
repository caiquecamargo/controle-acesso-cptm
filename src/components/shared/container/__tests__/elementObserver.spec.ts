import {
  intersectionObserverEntryIntersecting,
  intersectionObserverEntryNoIntersecting,
} from "../../../../controllers/__mocks__/IntersectionObserverEntry.mock";
import { mockWindowIntersectionObserver } from "../../../../__mocks__/window.mock";
import { ElementObserver } from "../controller/elementObserver";

describe("ElementObserver suit test", () => {
  let elementObserver: ElementObserver;

  beforeEach(() => {
    mockWindowIntersectionObserver();

    elementObserver = new ElementObserver();
  });

  it("should set the elementObserver property passing a IntersctionObserver to the class", () => {
    elementObserver.observer = new IntersectionObserver(() => {}, {
      threshold: 1,
    });

    expect(elementObserver.observer).toBeDefined();
  });

  it("should call the observe method from elementObserver", () => {
    const elementObserverObserveSpy = jest.spyOn(elementObserver, "observe");

    const div = document.createElement("div");
    elementObserver.observe(div);
    expect(elementObserverObserveSpy).toHaveBeenCalled();
  });

  it("should call the observer callback", () => {
    elementObserver.observer = new IntersectionObserver(
      elementObserver["observerCallback"],
      {
        threshold: 1,
      }
    );

    const elementObserverCallbackSpy = jest.spyOn(
      elementObserver.observer,
      "unobserve"
    );

    elementObserver["observerCallback"](
      [intersectionObserverEntryNoIntersecting()],
      elementObserver.observer
    );

    expect(elementObserverCallbackSpy).toHaveBeenCalledTimes(0);

    elementObserver["observerCallback"](
      [intersectionObserverEntryIntersecting()],
      elementObserver.observer
    );

    expect(elementObserverCallbackSpy).toHaveBeenCalled();
  });
});
