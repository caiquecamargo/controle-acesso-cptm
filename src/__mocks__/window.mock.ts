interface Options {
  width: number;
}

export function visualViewportMock(options?: Options): VisualViewport {
  const mockedWindow = { ...window };
  mockedWindow.visualViewport = {
    ...mockedWindow.visualViewport,
    width: 700,
    ...options,
  };

  return mockedWindow.visualViewport;
}

export function mockWindowVisualViewport(options?: Options) {
  const viewportMock = visualViewportMock(options);
  Object.defineProperty(window, "visualViewport", {
    configurable: true,
    enumerable: true,
    get: () => viewportMock,
  });

  return jest
    .spyOn(window, "visualViewport", "get")
    .mockReturnValue(viewportMock);
}

export function mockWindowIntersectionObserver() {
  window.IntersectionObserver = jest.fn((_callback, options) => ({
    root: null,
    rootMargin: "",
    thresholds: [],
    disconnect: jest.fn(() => null),
    observe: jest.fn(() => null),
    takeRecords: jest.fn(() => []),
    unobserve: jest.fn(() => null),
  }));
}

export function mockWindowAlert() {
  window.alert = jest.fn((message) => {});
}
