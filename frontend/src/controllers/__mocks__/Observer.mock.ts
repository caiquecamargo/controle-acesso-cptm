import { Observer } from "../../controllers/Observer";

export class ObserverMock extends Observer {
  protected _observer: IntersectionObserver;

  constructor() {
    super(Symbol("ObserverMock"));
    this._observer = new IntersectionObserver(this.observerCallback);
  }
  observerCallback: IntersectionObserverCallback = () => {};
}
