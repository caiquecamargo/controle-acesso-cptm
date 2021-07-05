import { intersectionObserverEntryNoIntersecting } from "../__mocks__/IntersectionObserverEntry.mock";
import { ObserverMock } from "../__mocks__/Observer.mock";

describe("Observer unit test", () => {
  let observer: ObserverMock;

  beforeEach(() => {
    window.IntersectionObserver = jest.fn((_callback, options) => ({
      root: null,
      rootMargin: "",
      thresholds: [],
      disconnect: jest.fn(() => null),
      observe: jest.fn(() => null),
      takeRecords: jest.fn(() => []),
      unobserve: jest.fn(() => null),
    }));

    observer = new ObserverMock();
  });

  it("should set the observer property passing a IntersctionObserver to the class", () => {
    observer.observer = new IntersectionObserver(() => {}, { threshold: 1 });

    expect(observer.observer).toBeDefined();
  });

  it("should call the observe method from Observer", () => {
    const observerObserveSpy = jest.spyOn(observer, "observe");

    const div = document.createElement("div");
    observer.observe(div);
    expect(observerObserveSpy).toHaveBeenCalled();
  });

  it("should call the observer callback", () => {
    const observerObserveSpy = jest.spyOn(observer, "observerCallback");
    observer.observer = new IntersectionObserver(observer.observerCallback, {
      threshold: 1,
    });
    observer["observerCallback"](
      [intersectionObserverEntryNoIntersecting()],
      observer.observer as IntersectionObserver
    );

    expect(observerObserveSpy).toHaveBeenCalled();
  });
});
