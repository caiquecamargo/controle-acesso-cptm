import { Provider } from "./Provider";

interface ObserverOptions {
  root?: HTMLElement;
}

export abstract class Observer extends Provider {
  protected abstract _observer: IntersectionObserver;
  protected _root?: HTMLElement;

  constructor(name: Symbol, options: ObserverOptions = {}) {
    super(name);
    this._root = options.root;
  }

  get observer() {
    return this._observer;
  }
  set observer(observer: IntersectionObserver) {
    this._observer = observer;
  }
  observe(element: HTMLElement) {
    this._observer.observe(element);
  }

  protected abstract observerCallback: IntersectionObserverCallback;
}
