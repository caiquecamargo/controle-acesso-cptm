import { InjectionKey } from "vue";
import { AnimeEntry } from "../../../../controllers/AnimeEntry";
import { Observer } from "../../../../controllers/Observer";

export const elementObserverKey: InjectionKey<ElementObserver> =
  Symbol("ElementObserver");

export class ElementObserver extends Observer {
  protected _observer: IntersectionObserver;

  constructor() {
    super(elementObserverKey);
    this._observer = new IntersectionObserver(this.observerCallback, {
      threshold: 0.5,
    });
  }

  protected observerCallback: IntersectionObserverCallback = (
    entries,
    observer
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        const delay = Number(element.dataset.delay);
        const animation = new AnimeEntry(element, "surge", { delay });
        animation.animate();

        observer.unobserve(element);
      }
    });
  };
}
