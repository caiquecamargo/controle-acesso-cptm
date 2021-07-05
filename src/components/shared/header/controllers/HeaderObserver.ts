import { InjectionKey } from "@vue/runtime-core";
import { Observer } from "../../../../controllers/Observer";

const CLASS = "off-top";
const THRESHOLD = 0.7;

export const HeaderObserverKey: InjectionKey<HeaderObserver> =
  Symbol("HeaderObserver");

export class HeaderObserver extends Observer {
  private _element?: HTMLElement;
  protected _observer: IntersectionObserver;

  constructor() {
    super(HeaderObserverKey);
    this._observer = new IntersectionObserver(this.observerCallback, {
      threshold: THRESHOLD,
    });
  }

  set element(element: HTMLElement | undefined) {
    this._element = element;
  }
  get element() {
    return this._element;
  }

  private setActive() {
    this._element?.classList.add(CLASS);
  }

  private unsetActive() {
    this._element?.classList.remove(CLASS);
  }

  byPassObserver() {
    this._element?.classList.add(CLASS);
  }

  protected observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) this.setActive();
      else this.unsetActive();
    });
  };
}
