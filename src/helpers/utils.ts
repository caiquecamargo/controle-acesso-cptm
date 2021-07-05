import { inject, InjectionKey } from "vue";

export function numberToReal(number: number) {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
}

export function isMobile() {
  return window.visualViewport.width < 1000;
}

export function getGridColumnsQty() {
  const windowSize = window.visualViewport.width;

  if (windowSize < 768) return 1;
  if (windowSize < 1024) return 2;
  if (windowSize < 1280) return 3;
  return 4;
}

export function onClickOutside(
  target: HTMLElement,
  self: HTMLElement
): boolean {
  const compareWithThisAndParent = (element: Element) =>
    element === target || element === target.parentElement;
  const isChild =
    Array.from(self.children).findIndex(compareWithThisAndParent) !== -1;

  const isSelf = target === self;

  return !isSelf && !isChild;
}

export function isOdd(number: number) {
  return number % 2 !== 0;
}

export function madeOddArray<T>(arr: Array<T>): Array<T> {
  if (isOdd(arr.length)) return arr;

  return arr.slice(0, arr.length - 1);
}

export function getElement(element: HTMLElement | undefined): HTMLElement {
  if (!element) throw new Error("Element not setted!");

  return element;
}

export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback);
  if (!resolved) throw new Error(`Could not resolve ${key.description}`);

  return resolved;
}
