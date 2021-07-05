import {
  intersectionObserverEntryIntersecting,
  intersectionObserverEntryNoIntersecting,
} from "../../../../controllers/__mocks__/IntersectionObserverEntry.mock";
import { mockWindowIntersectionObserver } from "../../../../__mocks__/window.mock";
import { HeaderObserver } from "../controllers/HeaderObserver";

describe("HeaderObserver test suit", () => {
  let headerObserver: HeaderObserver;

  beforeEach(() => {
    mockWindowIntersectionObserver();

    headerObserver = new HeaderObserver();
  });

  it("should set an HTML element to element propertie", () => {
    const div = document.createElement("div");

    headerObserver.element = div;
    expect(headerObserver.element).toBe(div);
  });

  it("should set class to the element when bypass the observer", () => {
    const div = document.createElement("div");

    headerObserver.element = div;
    headerObserver.byPassObserver();

    expect(headerObserver.element.classList.contains("off-top")).toBeTruthy();
  });

  it("should add and remove a class to an HTMLElement", () => {
    const div = document.createElement("div");
    headerObserver.element = div;
    headerObserver.observer = new IntersectionObserver(() => {});

    headerObserver["observerCallback"](
      [intersectionObserverEntryNoIntersecting()],
      headerObserver.observer
    );

    expect(headerObserver.element?.classList.contains("off-top")).toBeTruthy();

    headerObserver["observerCallback"](
      [intersectionObserverEntryIntersecting()],
      headerObserver.observer
    );
    expect(headerObserver.element?.classList.contains("off-top")).toBeFalsy();
  });
});
