import { reactive, readonly } from "vue"
import { Provider } from "../controllers/Provider";

export abstract class State<T extends Record<string, unknown>> extends Provider {
  protected _state: T;

  constructor(name: Symbol) {
    super(name)
    const data = this.data();
    this._state = reactive(data) as T;
  }

  protected abstract data(): T;

  public get state(): T {
    return readonly(this._state) as T;
  }
}