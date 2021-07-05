export const intersectionObserverEntryIntersecting = (element?: HTMLElement): IntersectionObserverEntry => {
  return {
    boundingClientRect: {} as DOMRectReadOnly,
    intersectionRatio: 1,
    intersectionRect: {} as DOMRectReadOnly,
    isIntersecting: true,
    rootBounds: {} as DOMRectReadOnly,
    target: element || document.createElement("div"),
    time: 0,
  }
}

export const intersectionObserverEntryNoIntersecting = (element?: HTMLElement): IntersectionObserverEntry => {
  return {
    boundingClientRect: {} as DOMRectReadOnly,
    intersectionRatio: 1,
    intersectionRect: {} as DOMRectReadOnly,
    isIntersecting: false,
    rootBounds: {} as DOMRectReadOnly,
    target: element || document.createElement("div"),
    time: 0,
  }
}